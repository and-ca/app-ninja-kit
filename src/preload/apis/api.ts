import { ipcRenderer } from 'electron';

//types
import { API } from '../types';

//enum
import { ChannelSend, ChannelInvoke, ChannelListen } from '../../renderer/src/Enum';

export const api = <API>{
  send: <C extends ChannelSend>(channel: C, message: string = ''): void => {
    if (!Object.values(ChannelSend).includes(channel)) {
      throw new Error('Channel not available');
    }

    ipcRenderer.send(channel, message);
  },
  invoke: async <C extends ChannelInvoke>(channel: C, message: string = ''): Promise<string> => {
    if (!Object.values(ChannelInvoke).includes(channel)) {
      throw new Error('Channel not available');
    }

    const newMessage = typeof message === 'object' ? JSON.stringify(message) : String(message);
    return await ipcRenderer.invoke(channel, newMessage);
  },
  listen: <C extends ChannelListen>(channel: C, listener: () => void): void => {
    if (!Object.values(ChannelListen).includes(channel)) {
      throw new Error('Channel not available');
    }

    ipcRenderer.on(channel, listener);
  }
};
