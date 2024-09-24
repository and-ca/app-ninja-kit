export class StoreError extends Error {
  constructor(
    message: string,
    public code: number
  ) {
    super(message);
    this.name = 'StoreError';
  }
}
