const {remote} = require('electron')
const {Menu, MenuItem} = remote
import { store } from '../../client.js'

export default class MainMenu {
  constructor () {
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
            label: 'Sort Alphabeticaly',
            click () {
              store.dispatch({type: 'ALPHA'})
            }
          },
          {
            label: 'Sort Newest',
            click () {
              store.dispatch({type: 'NEW'})
            }
          },
          {
            type: 'separator'
          },
          {
            label: 'Reload',
            accelerator: 'CmdOrCtrl+R',
            click (item, focusedWindow) {
              if (focusedWindow) focusedWindow.reload()
            }
          },
          {
            label: 'Toggle Full Screen',
            accelerator: process.platform === 'darwin' ? 'Ctrl+Command+F' : 'F11',
            click (item, focusedWindow) {
              if (focusedWindow) focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
            }
          },
          {
            label: 'Toggle Developer Tools',
            accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
            click (item, focusedWindow) {
              if (focusedWindow) focusedWindow.webContents.toggleDevTools()
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
        label: 'Destroyer',
        submenu: [
          {
            label: 'Add Files...',
            accelerator: 'Command+,',
            click () {
              store.dispatch({type: 'ADMIN'})
            }
          },
          {
            label: 'Edit Metadata...',
            accelerator: 'Command+m',
            click () {
              store.dispatch({type: 'EDIT_METADATA'})
            }
          },
          {
            label: 'Quit',
            accelerator: 'Command+Q',
            click () {
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
