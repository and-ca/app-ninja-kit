export class MainEncryptionError extends Error {
  constructor(
    message: string,
    public code: number
  ) {
    super(message);
    this.name = 'MainEncryptionError';
  }
}
