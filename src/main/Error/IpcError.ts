export class IpcError extends Error {
  constructor(
    message: string,
    public code: number
  ) {
    super(message);
    this.name = 'IpcError';
  }
}
