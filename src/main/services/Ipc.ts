import { ipcMain, BrowserWindow } from 'electron';

import IpcReceive from './IpcReceive';
import IpcRequest from './IpcRequest';
import Store from './Store';

//Enum
import { ChannelSend, ChannelInvoke, ChannelListen } from '../Enum';

//Error
import { StoreError, IpcError } from '../Error';

type ResponseCode = 200 | 400 | 401 | 404 | 500;

type Response = {
  code: ResponseCode;
  success: boolean;
  message: string;
  data?: string;
};

export default class Ipc {
  private isDev = process.env.NODE_ENV === 'development';
  public static store: Store;
  private static ipcMain: Electron.IpcMain;
  private static mainWindow: BrowserWindow;

  constructor(mainWindow: BrowserWindow) {
    Ipc.store = new Store(!this.isDev);
    Ipc.ipcMain = ipcMain;
    Ipc.mainWindow = mainWindow;

    this.register();
  }

  private register(): void {
    for (const channel of Object.values(ChannelSend)) {
      Ipc.ipcMain.on(channel, (event: Electron.IpcMainEvent, args: string): void => {
        this.handleSendMessage(channel, event, args);
      });
    }

    for (const channel of Object.values(ChannelInvoke)) {
      Ipc.ipcMain.handle(
        channel,
        async (event: Electron.IpcMainInvokeEvent, args: string): Promise<string> => {
          return JSON.stringify(await this.handleInvokeMessage(channel, event, args));
        }
      );
    }
  }

  // Handle the message based on the channel
  private async handleSendMessage(
    channel: ChannelSend,
    event: Electron.IpcMainEvent,
    args: string
  ): Promise<void> {
    try {
      switch (channel) {
        case ChannelSend.WindowMin:
          IpcReceive.handleMinimizeWindows();
          break;
        case ChannelSend.WindowMax:
          IpcReceive.handleMaximizeWindows();
          break;
        case ChannelSend.WindowUnMax:
          IpcReceive.handleUnmaximizeWindows();
          break;
        case ChannelSend.WindowClose:
          IpcReceive.handleCloseWindows();
          break;
        default:
          console.log(`No handler for channel: ${channel}, ${event}, ${args}`);
      }
    } catch (error) {
      if (error instanceof StoreError) {
        console.error(`Storage error (${error.code}): ${error.message}`);
      } else if (error instanceof IpcError) {
        console.error(`Ipc error (${error.code}): ${error.message}`);
        if (error.code === 400) {
          throw new Error(error.message);
        }
      } else if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
    }
  }

  // Handle the message based on the channel
  private async handleInvokeMessage(
    channel: ChannelInvoke,
    event: Electron.IpcMainInvokeEvent,
    args: string
  ): Promise<Response> {
    try {
      switch (channel) {
        case ChannelInvoke.Save: {
          const value = await IpcRequest.handleSaveCollection(args);
          return value
            ? this.buildResponse(200, true, 'pass', value)
            : this.buildResponse(200, false, 'fail');
        }
        case ChannelInvoke.Validate: {
          const value = await IpcRequest.handleValidateCollection(args);
          return value
            ? this.buildResponse(200, true, 'pass', value)
            : this.buildResponse(200, false, 'fail');
        }
        default:
          throw new IpcError(`Api does not accept this Channel: ${channel}`, 401);
      }
    } catch (error) {
      if (error instanceof StoreError) {
        console.error(`Storage error (${error.code}): ${error.message}`);
        return this.buildResponse(400, false, error.message);
      } else if (error instanceof IpcError) {
        console.error(`Ipc error (${error.code}): ${error.message}`);
        return this.buildResponse(400, false, error.message);
      } else if (error instanceof Error) {
        console.error(error.message);
        return this.buildResponse(500, false, error.message);
      } else {
        console.error(error);
        console.log(event);
      }
      return this.buildResponse(500, false, 'Something went wrong!');
    }
  }

  public sendMessage(channel: ChannelListen, message: string): void {
    if (!Object.values(ChannelListen).includes(channel)) {
      throw new IpcError('Channel not available', 201);
    }
    Ipc.mainWindow.webContents.send(channel, message);
  }

  private buildResponse(
    code: ResponseCode,
    success: boolean,
    message: string,
    data?: string
  ): Response {
    const response: Response = {
      code,
      success,
      message,
      data
    };

    return response;
  }
}
