import { app } from 'electron';
import fs from 'fs';
import path from 'path';

import DoubleCrypto from './DoubleCrypto';

//enum
import { FileType, Collection } from '../Enum';

//types
import { DataMap, SaveFunc } from '../types';

//error
import { StoreError } from '../Error';

export default class Store {
  private crypto: DoubleCrypto;
  private static defaultPath = path.join(app.getPath('userData'), 'Data');
  private path: string;
  private isEncryptoOn: boolean = false;
  private lockLimit = 120; //seconds
  private static lock = {
    [Collection.Config]: false,
    [Collection.MediaList]: false
  };

  constructor(isEncryptoOn: boolean = false, userPath?: string) {
    this.crypto = new DoubleCrypto();
    this.path = userPath ?? Store.defaultPath;
    this.isEncryptoOn = isEncryptoOn;
    if (!fs.existsSync(this.path)) {
      fs.mkdirSync(this.path, { recursive: true });
    }
  }

  /**
   * Save encrypted collection data
   * @param data
   * @param collection
   */
  private async saveData<C extends Collection>(data: DataMap[C], collection: C): Promise<void> {
    try {
      const filePath = path.join(this.path, `${collection}.${this.isEncryptoOn ? 'dat' : 'json'}`);
      this.isEncryptoOn
        ? await fs.promises.writeFile(filePath, this.crypto.encryptString(JSON.stringify(data)))
        : await fs.promises.writeFile(filePath, JSON.stringify(data));
    } catch (err: unknown) {
      console.error(err);
      throw new StoreError('Could not save the information.', 100);
    }
  }

  /**
   * Get encrypted collection data
   * @param collection
   * @returns Collection Data
   */
  private getData<C extends Collection>(collection: C): DataMap[C] | undefined {
    const filePath = path.join(this.path, `${collection}.${this.isEncryptoOn ? 'dat' : 'json'}`);
    try {
      if (!fs.existsSync(filePath)) return undefined;
      return this.isEncryptoOn
        ? JSON.parse(this.crypto.decryptString(fs.readFileSync(filePath)))
        : JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (err: unknown) {
      console.error(`Error reading data from ${filePath}:`, err);
      return undefined;
    }
  }

  /**
   * Acquire Collection Lock
   *  - This method should be used when manipulating data (e.g., Get, Edit, Save).
   *  - It ensures data integrity by preventing data loss if two or more save
   * operations occur simultaneously.
   *
   * @param collection
   * @returns Boolean - Lock was acquired?
   */
  private async acquireLock<C extends Collection>(collection: C): Promise<boolean> {
    if (!Store.lock[collection]) {
      Store.lock[collection] = true;
      return Store.lock[collection];
    }

    let count = 0;
    do {
      await new Promise((r) => setTimeout(r, 1000));
      count++;
      if (!Store.lock[collection]) {
        Store.lock[collection] = true;
        break;
      }
    } while (count < this.lockLimit);

    if (!Store.lock[collection]) {
      throw new StoreError('Can not acquire lock', 101);
    }

    return Store.lock[collection];
  }

  /**
   * Release Collection Lock
   * @param collection
   */
  private releaseLock<C extends Collection>(collection: C): void {
    Store.lock[collection] = false;
  }

  /**
   * Save collection with lock.
   *
   * @param collection
   * @param func
   */
  private async save<C extends Collection>(collection: C, func: SaveFunc): Promise<void> {
    const lock = await this.acquireLock(collection);

    if (!lock) {
      throw new StoreError('could not gacquire lock.', 102);
    }

    try {
      const data = this.getData(collection);
      await this.saveData(func(data), collection);
    } catch (error: unknown) {
      this.releaseLock(collection);
      console.error('An error occurred:', error);
      throw new StoreError('could not save the data', 103);
    }
  }

  /**
   * Save file without encryption
   * @param data
   * @param type
   * @param fileName
   */
  public async saveFile(data: Buffer, type: FileType, fileName: string): Promise<void> {
    const filePath = path.join(this.path, `/${type}/`, fileName);
    try {
      await fs.promises.writeFile(filePath, data);
    } catch (err: unknown) {
      console.error(err);
      throw new StoreError('Could not save the information.', 104);
    }
  }

  /**
   * Get file withou encryption
   * @param type
   * @param fileName
   * @returns
   */
  public getFile(type: FileType, fileName: string): Buffer | undefined {
    const filePath = path.join(this.path, `/${type}/`, fileName);
    try {
      return fs.readFileSync(filePath);
    } catch (err: unknown) {
      console.error(err);
      return undefined;
    }
  }

  /**
   * Get collection value
   * @param collection
   * @param property
   * @returns
   */
  public getValue<C extends Collection, K extends keyof DataMap[C]>(
    collection: C,
    property: K
  ): DataMap[C][K] {
    const data = this.getData(collection);

    if (!data) {
      throw new StoreError(`Collection ${collection} does not exist`, 105);
    }

    if (!(property in data)) {
      throw new StoreError(`Property ${String(property)} does not exist`, 106);
    }

    return data[property];
  }

  /**
   * Save collection value, with lock.
   *
   * @param collection
   * @param property
   * @param value
   */
  public async saveValue<C extends Collection, K extends keyof DataMap[C]>(
    collection: C,
    property: K,
    value: DataMap[C][K]
  ): Promise<void> {
    this.save(collection, (data) => {
      return data
        ? {
            ...data,
            [property]: value
          }
        : {
            [property]: value
          };
    });
  }

  /**
   * Append collection value to an array, with lock.
   *
   * @param collection
   * @param property
   * @param value
   */
  public async appendValueToArray<C extends Collection, K extends keyof DataMap[C]>(
    collection: C,
    property: K,
    value: DataMap[C][K]
  ): Promise<void> {
    this.save(collection, (data) => {
      return data
        ? {
            ...data,
            [property]: data[property] ? [...data[String(property)], value] : [value]
          }
        : {
            [property]: [value]
          };
    });
  }

  /**
   * Edit an element of an array from collection property with lock.
   *
   * @param collection
   * @param property
   * @param value
   */
  public async editArrayElement<C extends Collection, K extends keyof DataMap[C]>(
    collection: C,
    property: K,
    newValue: DataMap[C][K],
    index: number
  ): Promise<void> {
    this.save(collection, (data) => {
      if (!data) {
        throw new StoreError(`Could not find collection: ${collection}`, 108);
      }

      if (!data[property]) {
        throw new StoreError(`Could not find property: ${String(property)}`, 109);
      }

      if (!Array.isArray(!data[property])) {
        throw new StoreError(`Property '${String(property)}' is not array`, 110);
      }

      if (!data[property][index]) {
        throw new StoreError(`Index '${index}' not found.`, 112);
      }

      const newArray = data[property];
      newArray[index] = newValue;

      return {
        ...data,
        [property]: newArray
      };
    });
  }

  /**
   * Advanced editions
   * Get the data, edit and save with lock.
   *
   * @param collection
   * @param func
   */
  public async getAndSaveData<C extends Collection>(collection: C, func: SaveFunc): Promise<void> {
    this.save(collection, func);
  }
}
