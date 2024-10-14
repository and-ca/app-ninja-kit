import * as crypto from 'crypto';

//Error
import { MainEncryptionError } from '../Error';

type Session = {
  id: string;
  key: string;
};

type EncryptedMessage = {
  id: string;
  token: string;
};

class MainEncryption {
  private privateKey: crypto.KeyObject;
  public publicKey: string;
  private session: Session[] = [];

  constructor() {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048
    });
    this.privateKey = privateKey;
    this.publicKey = publicKey.export({ type: 'spki', format: 'der' }).toString('base64');
  }

  /**
   * Save Session in memory in the Main Side
   * Decrypt session, validate it and save it
   * @param encryptedSession - Session encrypted with Public key
   * @returns
   */
  public async setSession(encryptedSession: string): Promise<boolean> {
    const session: Session = JSON.parse(await this.asymmetricDecryption(encryptedSession));

    if (!session) {
      throw new MainEncryptionError('Could not find valid Session!', 8001);
    }

    if (
      !session.id ||
      typeof session.id !== 'string' ||
      !session.key ||
      typeof session.key !== 'string'
    ) {
      throw new MainEncryptionError('Could not find valid Session!', 8001);
    }

    if (this.session.some((el) => el.id === session.id)) {
      throw new MainEncryptionError('Session alredy exist!', 800);
    }

    this.session.push(session);

    return true;
  }

  /**
   * Get saved Session with Session Id
   * @param encryptedMessage Json string with id and token
   * @returns
   */
  private getSession(encryptedMessage: string): Session {
    const { id }: EncryptedMessage = JSON.parse(encryptedMessage);

    if (!id || typeof id !== 'string') {
      throw new MainEncryptionError('Invalid Session!', 801);
    }

    const session: Session | undefined = this.session.find((el) => el.id === id);

    if (!session) {
      throw new MainEncryptionError('Session does not exist!', 801);
    }

    return session;
  }

  /**
   * Decypted message
   * @param encryptedMessage
   * @returns
   */
  public decryptMessage(encryptedMessage: string): string {
    const session = this.getSession(encryptedMessage);
    const { token }: EncryptedMessage = JSON.parse(encryptedMessage);

    const sessionKey = this.hexStringToUint8Array(session.key);
    const encryptedArray = this.hexStringToUint8Array(token);

    // Extract IV (first 16 bytes) and encrypted data (remaining bytes)
    const iv = encryptedArray.subarray(0, 16);
    const encryptedData = Buffer.from(encryptedArray.subarray(16));

    // Create the decipher using AES-CBC, the session key, and the IV
    const decipher = crypto.createDecipheriv('aes-256-cbc', sessionKey, iv);

    // Decrypt the data
    const decrypted = Buffer.concat([decipher.update(encryptedData), decipher.final()]);

    // Convert decrypted Buffer to string and return
    return decrypted.toString('utf8');
  }

  /**
   * Encrypt message
   * @param message
   * @param session
   * @returns
   */
  public encryptMessage(args: string, message: string): string {
    const session = this.getSession(args);
    const sessionKey = this.hexStringToUint8Array(session.key);

    const iv = crypto.randomBytes(16); // Generate a random IV
    const cipher = crypto.createCipheriv('aes-256-cbc', sessionKey, iv);

    // Encrypt the plain text
    const encrypted = Buffer.concat([cipher.update(message, 'utf8'), cipher.final()]);

    // Combine IV and encrypted data
    const encryptedMessage = Buffer.concat([iv, encrypted]);

    // Return the encrypted message as a hex string
    return encryptedMessage.toString('hex');
  }

  /**
   * Decrypted message with pair Public-Private Keys
   * @param encryptedMessage
   * @returns
   */
  private async asymmetricDecryption(encryptedMessage: string): Promise<string> {
    const encryptedBuffer = Buffer.from(encryptedMessage, 'base64');
    const uint8ArrayEncrypted = new Uint8Array(encryptedBuffer);

    const decryptedBuffer = crypto.privateDecrypt(
      {
        key: this.privateKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256'
      },
      uint8ArrayEncrypted
    );

    return decryptedBuffer.toString('utf-8');
  }

  /**
   * Convert Hex sting to Unit 8 Array
   * @param hexString
   * @returns
   */
  private hexStringToUint8Array(hexString: string): Uint8Array {
    const bytes = new Uint8Array(hexString.length / 2);
    for (let i = 0; i < bytes.length; i++) {
      bytes[i] = parseInt(hexString.slice(i * 2, i * 2 + 2), 16);
    }
    return bytes;
  }
}

export default MainEncryption;
