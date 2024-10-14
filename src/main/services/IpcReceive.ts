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
}
