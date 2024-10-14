import { ipcRenderer } from 'electron';

//Encrypt Connection
import PreloadEncryption from '../services/PreloadEncryption';

//types
import { API, Response } from '../types';

//enum
import { ChannelSend, ChannelInvoke, ChannelListen } from '../../renderer/src/Enum';

export const api = <API>{
  send: async <C extends ChannelSend>(channel: C, message: string = 'no message'): Promise<void> => {
    if (!Object.values(ChannelSend).includes(channel)) {
      throw new Error('Channel not available');
    }

    const session = new PreloadEncryption();
    const secureMessage = await session.encryptMessage(message);
    ipcRenderer.send(channel, secureMessage);
  },
  invoke: async <C extends ChannelInvoke>(channel: C, message: string = ''): Promise<Response> => {
    if (!Object.values(ChannelInvoke).includes(channel)) {
      throw new Error('Channel not available');
    }

    const session = new PreloadEncryption();
    const secureMessage = await session.encryptMessage(message);

    const response = JSON.parse(await ipcRenderer.invoke(channel, secureMessage));
    response.data = await session.decryptMessage(response.data);
    return response;
  },
  listen: <C extends ChannelListen>(channel: C, listener: () => void): void => {
    if (!Object.values(ChannelListen).includes(channel)) {
      throw new Error('Channel not available');
    }

    ipcRenderer.on(channel, listener);
  }
};
