const {remote} = require('electron')
const {Menu, MenuItem} = remote

export default class MainMenu {
  constructor (options) {
    this.template = [
      {
        label: 'Edit',
        submenu: [
          {
            label: 'Cut',
            accelerator: 'CmdOrCtrl+X',
            role: 'cut'
          },
          {
            label: 'Copy',
            accelerator: 'CmdOrCtrl+C',
            role: 'copy'
          },
          {
            label: 'Paste',
            accelerator: 'CmdOrCtrl+V',
            role: 'paste'
          },
          {
            label: 'Select All',
            accelerator: 'CmdOrCtrl+A',
            role: 'selectall'
          }
        ]
      },
      {
        label: 'View',
        submenu: [
          {
            label: 'Reload',
            accelerator: 'CmdOrCtrl+R',
            click(item, focusedWindow) {
              if (focusedWindow) focusedWindow.reload()
            }
          },
          {
            label: 'Toggle Full Screen',
            accelerator: process.platform === 'darwin' ? 'Ctrl+Command+F' : 'F11',
            click(item, focusedWindow) {
              if (focusedWindow)
                focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
            }
          }
        ]
      },
      {
        label: 'Window',
        role: 'window',
        submenu: [
          {
            label: 'Minimize',
            accelerator: 'CmdOrCtrl+M',
            role: 'minimize'
          },
          {
            label: 'Close',
            accelerator: 'CmdOrCtrl+W',
            role: 'close'
          }
        ]
      }
    ]
    if (process.platform === 'darwin') {
      this.template.unshift({
        label: name,
        submenu: [
          {
            label: 'Preferences...',
            accelerator: 'Command+,',
            click() {
              options.preferences()
            }
          },
          {
            label: 'Quit',
            accelerator: 'Command+Q',
            click() {
              remote.app.quit()
            }
          }
        ]
      })
      this.template[3].submenu.push(
        {
          type: 'separator'
        },
        {
          label: 'Bring All to Front',
          role: 'front'
        }
      )
    }
    Menu.setApplicationMenu(Menu.buildFromTemplate(this.template))
  }
}
