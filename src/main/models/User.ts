import Ipc from '../services/Ipc';

//enum
import { Collection, ConfigProperties } from '../Enum';

//error
import { StoreError } from '../Error';

export type UserType = {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
};

export class User {
  public firstName: string;
  public lastName: string;
  public email: string;
  private password: string;

  constructor(user: UserType) {
    this.firstName = user.firstName ?? '';
    this.lastName = user.lastName ?? '';
    this.email = user.email;
    this.password = user.password;
  }

  public userToString(): string {
    const { firstName, lastName, email } = this;
    return JSON.stringify({ firstName, lastName, email });
  }

  public add(): void {
    try {
      const users = User.getUsers();
      if (users?.find((el) => el.email === this.email)) {
        throw new StoreError(`User already exist: ${this.email}`, 150);
      }
    } catch (error) {
      if (error instanceof StoreError) {
        if (error.code === 150) throw new StoreError(`User already exist: ${this.email}`, 150);
      }
    }

    const data = {
      ...this,
      password: this.password
    };

    Ipc.store.appendValueToArray(Collection.Config, ConfigProperties.User, data);
  }

  private static getUsers(): UserType[] {
    return Ipc.store.getValue(Collection.Config, ConfigProperties.User) as UserType[];
  }

  public static objToUser(obj: UserType): User {
    return new User(obj);
  }

  public static getUserByEmailAndPassword(user: UserType): User | undefined {
    const users = this.getUsers();
    const userData = users.find((el) => el.email === user.email && el.password === user.password);
    return userData ? new User(userData) : userData;
  }
}
