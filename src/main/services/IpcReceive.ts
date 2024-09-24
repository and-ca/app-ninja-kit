import Window from './Window';
export default class IpcReceive {
  public static handleMinimizeWindows(): void {
    Window.minimizeAllWidows();
  }

  public static handleMaximizeWindows(): void {
    Window.maximizeAllWidows();
  }

  public static handleUnmaximizeWindows(): void {
    Window.unmaximizeAllWidows();
  }

  public static handleCloseWindows(): void {
    Window.closeAllWidows();
  }

  public static handleAnotherChannel(event: Electron.IpcMainEvent, args: string): void {
    console.log(
      `Received message on another-channel with args: ${args} and frameid: ${event.frameId}`
    );
  }
}
