export class CryptoError extends Error {
  constructor(
    message: string,
    public code: number
  ) {
    super(message);
    this.name = 'CryptoError';
  }
}
