import { app, Tray, Menu, nativeImage } from 'electron';
import path from 'path';

import Window from './Window';

export default class TrayMenu {
  private tray: null | Tray;

  constructor(
    title: string,
    tooltip: string,
    customMenu?: Array<Electron.MenuItemConstructorOptions>
  ) {
    const trayIcon = path.join(app.getAppPath(), 'resources', 'icon.ico');
    const icon = nativeImage.createFromPath(trayIcon);
    this.tray = new Tray(icon);

    this.tray.setContextMenu(this.createMenu(customMenu));
    this.tray.setToolTip(tooltip);
    this.tray.setTitle(title);

    this.tray.on('double-click', () => {
      Window.showAllWidows();
    });
  }

  private createMenu(customMenu?: Array<Electron.MenuItemConstructorOptions>): Menu {
    const defaultMenu: Array<Electron.MenuItemConstructorOptions> = [
      {
        label: 'Minimize',
        click: (): void => Window.minimizeAllWidows()
      },
      {
        label: 'Maximize',
        click: (): void => Window.maximizeAllWidows()
      },
      {
        type: 'separator'
      },
      {
        label: 'Show',
        click: (): void => Window.showAllWidows()
      },
      {
        label: 'Hide',
        click: (): void => Window.hideAllWidows()
      },
      {
        type: 'separator'
      },
      {
        label: 'Quit',
        click: (): void => app.quit()
      }
    ];

    const contextMenu = Menu.buildFromTemplate(defaultMenu.concat(customMenu ?? []));
    return contextMenu;
  }

  public destroy(): void {
    this.tray = null;
  }
}
