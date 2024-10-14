import { ipcRenderer } from 'electron';

//enum
import { ChannelInvoke } from '../../renderer/src/Enum';

type Session = {
  id: string;
  key: string;
};

export default class PreloadEncryption {
  private session: Session;
  private hasConnection: boolean = false;

  constructor() {
    this.session = {
      id: this.generateToken(),
      key: this.generateToken()
    };
  }

  /**
   * Handshake: Init Encypted Channel Connection before exchange data
   * 1. Request the Public Key
   * 2. Genarate Session Obj with ID and KEY
   * 3. Stringfy and encrpyt Session Onj with Public Key and send it to Main
   * 4. Both sides will be able to use Session to Encrypt and Decrypt exchanged data
   */
  private async init(): Promise<void> {
    if (!this.hasConnection) {
      const encryptedSession = await PreloadEncryption.asymmetricEncryption(
        JSON.stringify(this.session)
      );

      const result = JSON.parse(
        await ipcRenderer.invoke(ChannelInvoke.ConnectionSession, encryptedSession)
      );

      if (!result?.success) {
        throw new Error('Could not send sessionId to Main process!');
      }

      this.hasConnection = true;
    }
  }

  /**
   * Genarate tokens
   *
   * @returns token
   */
  private generateToken(): string {
    return this.uint8ArrayToHexString(crypto.getRandomValues(new Uint8Array(32)));
  }

  /**
   * Asymmetric encryption is only used during the handshake phase to
   * exchange the session securely.
   *
   * @param message
   * @returns
   */
  public static async asymmetricEncryption(message: string): Promise<string> {
    const publicKey = JSON.parse(await ipcRenderer.invoke(ChannelInvoke.ConnectionPublicKey));

    if (!publicKey.success) {
      throw new Error('Could not get Public Key!');
    }
    try {
      // Decode base64-encoded DER public key
      const publicKeyArray = Uint8Array.from(atob(publicKey.data), (c) => c.charCodeAt(0));

      // Import the public key
      const importPublicKey = await crypto.subtle.importKey(
        'spki',
        publicKeyArray,
        {
          name: 'RSA-OAEP',
          hash: 'SHA-256'
        },
        false,
        ['encrypt']
      );

      const encryptedBuffer = await crypto.subtle.encrypt(
        {
          name: 'RSA-OAEP'
        },
        importPublicKey,
        new TextEncoder().encode(message) // Convert string to Uint8Array
      );

      return btoa(String.fromCharCode(...new Uint8Array(encryptedBuffer))); // Convert to base64 for transmission
    } catch (error) {
      console.error(error);
      throw new Error('Failed to decode or process the public key: ');
    }
  }

  /**
   * Encyrpt message before send to request
   * @param message
   * @returns
   */
  public async encryptMessage(message: string): Promise<string> {
    await this.init();

    const encoder = new TextEncoder();
    const data = encoder.encode(message);

    // Import the AES-CBC key from a hex string
    const key = await crypto.subtle.importKey(
      'raw',
      this.hexStringToUint8Array(this.session.key),
      { name: 'AES-CBC' },
      false,
      ['encrypt']
    );

    // Generate a random IV (Initialization Vector)
    const iv = crypto.getRandomValues(new Uint8Array(16));

    // Encrypt the data
    const encrypted = await crypto.subtle.encrypt({ name: 'AES-CBC', iv }, key, data);

    // Combine IV and encrypted data
    const encryptedArray = new Uint8Array(encrypted);
    const combinedArray = new Uint8Array(iv.length + encryptedArray.length);
    combinedArray.set(iv); // Set IV at the start
    combinedArray.set(encryptedArray, iv.length); // Append encrypted data after IV

    // Convert combined array to hex string
    const encryptedString = this.uint8ArrayToHexString(combinedArray);

    // Return JSON with session id and token
    return JSON.stringify({
      id: this.session.id,
      token: encryptedString
    });
  }

  /**
   * Decrypt message received from request
   * @param encryptedMessage
   * @returns
   */
  public async decryptMessage(encryptedMessage: string): Promise<string> {
    await this.init();

    const encryptedData = this.hexStringToUint8Array(encryptedMessage);

    const iv = encryptedData.subarray(0, 16);
    const data = encryptedData.subarray(16);

    const key = await crypto.subtle.importKey(
      'raw',
      this.hexStringToUint8Array(this.session.key),
      { name: 'AES-CBC' },
      false,
      ['decrypt']
    );

    const decrypted = await crypto.subtle.decrypt({ name: 'AES-CBC', iv }, key, data);
    // Decode the decrypted ArrayBuffer into a string
    const decoder = new TextDecoder();
    return decoder.decode(decrypted);
  }

  /**
   * Convert Hex String to Unit8Array
   * @param hexString
   * @returns
   */
  private hexStringToUint8Array(hexString: string): Uint8Array {
    const bytes = new Uint8Array(hexString.length / 2);
    for (let i = 0; i < bytes.length; i++) {
      bytes[i] = parseInt(hexString.slice(i * 2, i * 2 + 2), 16); // Use slice instead of substr
    }
    return bytes;
  }

  /**
   * Convert Unit 8 Array to Hex string
   * @param bytes
   * @returns
   */
  private uint8ArrayToHexString(bytes: Uint8Array): string {
    return Array.from(bytes)
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('');
  }
}
