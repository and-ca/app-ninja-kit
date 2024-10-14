import { ChannelSend, ChannelInvoke, ChannelListen } from '../../renderer/src/Enum';

export interface API {
  /**
   * Send secure message to main process (one way: renderer to main)
   *
   * @param channel
   * @param message
   * @returns
   */
  send: <C extends ChannelSend>(channel: C, message: string = '') => void;

  /**
   * Send secure message to main process and wait for a secure response (two way: renderer to main to renderer)
   * @param channel
   * @param message
   * @returns
   */
  invoke: <C extends ChannelInvoke>(channel: C, message: string = '') => Promise<Response>;

  /**
   * Receive message from main process (one way: main to redenrer)
   * @param channel
   * @param listener
   * @returns
   */
  listen: <C extends ChannelListen>(channel: C, listener: () => void) => void;
}

export type ResponseCode = 200 | 400 | 401 | 404 | 500;

export type Response = {
  code: ResponseCode;
  success: boolean;
  message: string;
  data?: string;
};

