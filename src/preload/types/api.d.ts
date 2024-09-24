import { ChannelSend, ChannelInvoke, ChannelListen } from '../../renderer/src/Enum';

export interface API {
  /**
   * Send message to main process (one way: renderer to main)
   *
   * @param channel
   * @param message
   * @returns
   */
  send: <C extends ChannelSend>(channel: C, message: string = '') => void;

  /**
   * Send message to main process and wait for a response (two way: renderer to main to renderer)
   * @param channel
   * @param message
   * @returns
   */
  invoke: <C extends ChannelInvoke>(channel: C, message: string = '') => Promise<string>;

  /**
   * Receive message from main process (one way: main to redenrer)
   * @param channel
   * @param listener
   * @returns
   */
  listen: <C extends ChannelListen>(channel: C, listener: () => void) => void;
}
