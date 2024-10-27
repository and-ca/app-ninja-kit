import { ipcMain, BrowserWindow } from 'electron';

import IpcReceive from './IpcReceive';
import IpcRequest from './IpcRequest';
import MainEncryption from './MainEncryption';
import Store from './Store';

//Enum
import { ChannelSend, ChannelInvoke, ChannelListen } from '../Enum';

//Error
import { StoreError, IpcError, MainEncryptionError } from '../Error';

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
  private static mainEncryption: MainEncryption;

  constructor(mainWindow: BrowserWindow) {
    Ipc.store = new Store(!this.isDev);
    Ipc.ipcMain = ipcMain;
    Ipc.mainWindow = mainWindow;
    Ipc.mainEncryption = new MainEncryption();

    this.register();
  }

  /**
   * Register all listeners
   */
  private register(): void {
    for (const channel of Object.values(ChannelSend)) {
      Ipc.ipcMain.on(channel, (event: Electron.IpcMainEvent, args: string): void => {
        this.handleReceiveMessage(channel, event, args);
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


  /**
   * Handle the message received from SEND
   * One Way - No return
   * @param channel 
   * @param event 
   * @param args 
   */
  private async handleReceiveMessage(
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

  /**
   * Handle the message received from INVOKE
   * Two Ways - With return
   * @param channel
   * @param event
   * @param args
   * @returns
   */
  private async handleInvokeMessage(
    channel: ChannelInvoke,
    event: Electron.IpcMainInvokeEvent,
    args: string
  ): Promise<Response> {
    try {
      switch (channel) {
        case ChannelInvoke.ConnectionPublicKey: {
          const value = Ipc.mainEncryption.publicKey;
          return value
            ? this.buildResponse(200, true, 'pass', value)
            : this.buildResponse(200, false, 'fail');
        }
        case ChannelInvoke.ConnectionSession: {
          const value = await Ipc.mainEncryption.setSession(args);
          return value
            ? this.buildResponse(200, true, 'pass')
            : this.buildResponse(200, false, 'fail');
        }
        case ChannelInvoke.Save: {
          return this.handleInvokeSecureMessage(args, IpcRequest.handleSaveCollection);
        }
        case ChannelInvoke.Validate: {
          return this.handleInvokeSecureMessage(args, IpcRequest.handleValidateCollection);
        }
        case ChannelInvoke.Language: {
          return this.handleInvokeSecureMessage(args, IpcRequest.handleGetLanguage);
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
      } else if (error instanceof MainEncryptionError) {
        console.error(`Session error (${error.code}): ${error.message}`);
        return this.buildResponse(401, false, error.message);
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

  /**
   * Send message to Renderer process
   * @param channel
   * @param message
   */
  public sendMessage(channel: ChannelListen, message: string): void {
    if (!Object.values(ChannelListen).includes(channel)) {
      throw new IpcError('Channel not available', 201);
    }
    Ipc.mainWindow.webContents.send(channel, message);
  }

  /**
   * Decrypt, handle, encrypt and return Two Way massage
   * Find Session Key with Session Id,
   * Decrypt message with Session Key,
   * Call the handler,
   * Encrypt result,
   * Return encrypted data
   *
   * **Session is defined before request with Public-Private Keys
   * @param args
   * @param handler
   * @returns
   */
  private async handleInvokeSecureMessage(
    args: string,
    handler: CallableFunction
  ): Promise<Response> {
    const message = Ipc.mainEncryption.decryptMessage(args);
    const result = await handler(message);
    return result
      ? this.buildResponse(200, true, 'pass', Ipc.mainEncryption.encryptMessage(args, result))
      : this.buildResponse(200, false, 'fail');
  }


  /**
   * Build the Return Response
   * @param code response code
   * @param success response result
   * @param message response message
   * @param data response data
   * @returns Response object
   */
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
