import { shell, BrowserWindow } from 'electron';
import { join } from 'path';

export default class Window {
  private isDev = process.env.NODE_ENV === 'development';
  private mainWindow: BrowserWindow;
  private icon = process.platform === 'linux' ? 'icon.png' : 'icon.ico';
  constructor() {
    // Create the browser window.
    this.mainWindow = new BrowserWindow({
      width: 900,
      height: 670,
      show: false,
      frame: false,
      titleBarStyle: 'hidden',
      autoHideMenuBar: true,
      icon: join(__dirname, '../../resources', this.icon),
      webPreferences: {
        preload: join(__dirname, '../preload/index.js'),
        devTools: this.isDev,
        sandbox: true,
        contextIsolation: true,
        nodeIntegration: false,
        nodeIntegrationInWorker: false,
        nodeIntegrationInSubFrames: false
      }
    });

    this.mainWindow.on('ready-to-show', () => {
      this.mainWindow.show();
    });

    this.mainWindow.webContents.setWindowOpenHandler((details) => {
      shell.openExternal(details.url);
      return { action: 'deny' };
    });

    // HMR for renderer base on electron-vite cli.
    // Load the remote URL for development or the local html file for production.
    if (this.isDev && process.env['ELECTRON_RENDERER_URL']) {
      this.mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
    } else {
      this.mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
    }

    if (this.isDev) {
      this.mainWindow.webContents.openDevTools();
      //After all done, wait 1 sec then reload the page.
      //It will load the ReactDev Tools
      this.mainWindow.webContents.once('did-finish-load', () => {
        setTimeout(() => this.mainWindow.reload(), 2000);
      });
    }
  }

  public minimizeWidow(): void {
    this.mainWindow.minimize();
  }

  public unminimizeWidow(): void {
    this.mainWindow.unmaximize();
  }

  public maximizeWidow(): void {
    this.mainWindow.maximize();
  }

  public hideWidow(): void {
    this.mainWindow.hide();
  }

  public closeWidow(): void {
    this.mainWindow.close();
  }

  public showWidow(): void {
    this.mainWindow.show();
  }

  public isMaximized(): boolean {
    return this.mainWindow.isMaximized();
  }

  public static hasOpenedWindow(): boolean {
    return BrowserWindow.getAllWindows().length === 0;
  }

  public static minimizeAllWidows(): void {
    BrowserWindow.getAllWindows().forEach((window) => window.minimize());
  }

  public static maximizeAllWidows(): void {
    BrowserWindow.getAllWindows().forEach((window) => window.maximize());
  }

  public static unmaximizeAllWidows(): void {
    BrowserWindow.getAllWindows().forEach((window) => window.unmaximize());
  }

  public static closeAllWidows(): void {
    BrowserWindow.getAllWindows().forEach((window) => window.close());
  }

  public static hideAllWidows(): void {
    BrowserWindow.getAllWindows().forEach((window) => window.hide());
  }

  public static showAllWidows(): void {
    BrowserWindow.getAllWindows().forEach((window) => window.show());
  }
}
