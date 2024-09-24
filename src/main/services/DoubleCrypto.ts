import { safeStorage } from 'electron';
import crypto from 'crypto';

//types
import { CryptoObject } from '../types';

/**
 * This class implements double encryption for enhanced security:
 *
 * 1. **Node.js Crypto**: Uses a universal application key for initial encryption.
 * 2. **Electron Safe Storage**: Utilizes a user-specific key for additional encryption.
 *
 * The double encryption approach involves:
 * - Encrypting data with a universal key using Node.js's `crypto` module.
 * - Further encrypting the resulting ciphertext with a user-specific key using Electron's Safe Storage.
 */
export default class DoubleCrypto {
  private static key: Buffer;
  private static algorithm = 'aes-256-cbc';

  constructor() {
    const keyHex = import.meta.env.MAIN_VITE_CRYPTO_SECRET as string;
    if (!DoubleCrypto.key) {
      DoubleCrypto.key = Buffer.from(keyHex, 'hex');
    }
  }

  /**
   * Encrypt string
   * 1. **Node.js Crypto**: Uses a universal application key for initial encryption.
   * 2. **Electron Safe Storage**: Utilizes a user-specific key for additional encryption.
   *  - https://www.electronjs.org/docs/latest/api/safe-storage
   * @param plainText
   * @returns
   */
  public encryptString = (plainText: string): Buffer => {
    const encrypted = JSON.stringify(this.encrypt(plainText));

    return safeStorage.encryptString(encrypted);
  };

  /**
   * Decrypted string
   * @param encrypted
   * @returns plainTesxt
   */
  public decryptString = (encrypted: Buffer): string => {
    const cryptoObject = JSON.parse(safeStorage.decryptString(encrypted));

    return this.decrypt(cryptoObject);
  };

  /**
   * Encrypty - Fisrt layer with app secrets
   * **Node.js Crypto**
   * @param text
   * @returns
   */
  private encrypt(text: string): CryptoObject {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(DoubleCrypto.algorithm, DoubleCrypto.key, iv);

    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return { encryptedText: encrypted, iv: iv.toString('hex') };
  }

  /**
   *  Dencrypty - Fisrt layer with app secrets
   * **Node.js Crypto**
   * @param obj
   * @returns
   */
  private decrypt(obj: CryptoObject): string {
    const decipher = crypto.createDecipheriv(
      DoubleCrypto.algorithm,
      DoubleCrypto.key,
      Buffer.from(obj.iv, 'hex')
    );

    let decrypted = decipher.update(obj.encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  }
}
