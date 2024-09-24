import { BrowserWindow } from 'electron';

import Ipc from './Ipc';

//enum
import { ChannelListen } from '../Enum';

export default class IpcSend {
  private ipc: Ipc;

  constructor(mainWindow: BrowserWindow) {
    this.ipc = new Ipc(mainWindow);
  }

  public sendFirstMessage(args: string): void {
    this.ipc.sendMessage(ChannelListen.Config, args);
  }
}
