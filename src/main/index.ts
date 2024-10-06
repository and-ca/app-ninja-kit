import { app, session } from 'electron';
import { join } from 'path';

import IpcSend from './services/IpcSend';
import Window from './services/Window';
import TrayMenu from './services/TrayMenu';
import { AppElements } from './types/index';

//Error
import { StoreError, IpcError } from './Error';
const isDev = process.env.NODE_ENV === 'development';
const appElements: AppElements = {
  tray: TrayMenu,
  window: Window,
  IpcSend: IpcSend
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
//
// [TO BE UPDATE] Update the REACT and REDUX path with
// your path
app.whenReady().then(async () => {
  try {
    if (isDev) {
      const reactDevToolsPath = join(
        app.getPath('home'),
        '/AppData/Local/Google/Chrome/User Data/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/5.3.1_0'
      );
      const reduxDevToolsPath = join(
        app.getPath('home'),
        '/AppData/Local/Google/Chrome/User Data/Default/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd/3.2.7_0'
      );
      await session.defaultSession.loadExtension(reactDevToolsPath, {
        allowFileAccess: true
      });
      await session.defaultSession.loadExtension(reduxDevToolsPath, {
        allowFileAccess: true
      });
    }
  } catch (error) {
    console.error(error);
  }

  try {
    console.log('starting windows...');
    appElements.window = new Window();
    console.log('starting tray...');
    appElements.tray = new TrayMenu('Welcome to my App', 'My App');
    console.log('starting IPC...');
    appElements.IpcSend = new IpcSend(appElements.window);
    console.log('Ready!');
  } catch (error) {
    console.log('something went wrong. Could not start app!');
    if (error instanceof StoreError) {
      console.error(`Storage error (${error.code}): ${error.message}`);
    } else if (error instanceof IpcError) {
      console.error(`Ipc error (${error.code}): ${error.message}`);
    } else if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
  }

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (!Window.hasOpenedWindow()) appElements.window = new Window();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  appElements.tray.destroy();
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

//https://electronjs.org/docs/tutorial/security#12-disable-or-limit-navigation
app.on('web-contents-created', (event, contents) => {
  contents.on('will-navigate', (contentsEvent, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl);
    const validOrigins = ['http://localhost:5173/'];

    // Log and prevent the app from navigating to a new page if that page's origin is not whitelisted
    if (!validOrigins.includes(parsedUrl.origin)) {
      console.error(
        `The application tried to navigate to the following address: '${parsedUrl.origin}'. This origin is not whitelisted and the attempt to navigate was blocked.`
      );

      contentsEvent.preventDefault();
    }
    console.log(event);
  });

  contents.on('will-redirect', (contentsEvent, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl);
    const validOrigins = [''];

    // Log and prevent the app from redirecting to a new page
    if (!validOrigins.includes(parsedUrl.origin)) {
      console.error(
        `The application tried to redirect to the following address: '${navigationUrl}'. This attempt was blocked.`
      );

      contentsEvent.preventDefault();
    }
  });

  // https://electronjs.org/docs/tutorial/security#11-verify-webview-options-before-creation
  contents.on('will-attach-webview', (contentsEvent, webPreferences) => {
    // Strip away preload scripts if unused or verify their location is legitimate
    delete webPreferences.preload;

    // Disable Node.js integration
    webPreferences.nodeIntegration = false;
    console.log(contentsEvent);
  });

  // https://electronjs.org/docs/tutorial/security#13-disable-or-limit-creation-of-new-windows
  // https://github.com/electron/electron/pull/24517#issue-447670981
  contents.setWindowOpenHandler(({ url }) => {
    const parsedUrl = new URL(url);
    const validOrigins = [''];

    // Log and prevent opening up a new window
    if (!validOrigins.includes(parsedUrl.origin)) {
      console.error(
        `The application tried to open a new window at the following address: '${url}'. This attempt was blocked.`
      );

      return {
        action: 'deny'
      };
    }

    return {
      action: 'allow'
    };
  });
});
