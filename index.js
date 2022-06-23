const {app, BrowserWindow, TouchBar} = require('electron')
const {TouchBarLabel, TouchBarSpacer} = TouchBar
const windowStateKeeper = require('electron-window-state')
let mainWindow

const artist = new TouchBarLabel({textColor: '#5c43e8'})
const track = new TouchBarLabel({textColor: '#555555'})
const time = new TouchBarLabel({textColor: '#5c43e8'})

const touchBar = new TouchBar([
  artist,
  new TouchBarSpacer({size: 'small'}),
  track,
  new TouchBarSpacer({size: 'small'}),
  time
])

const createWindow = () => {
  let mainWindowState = windowStateKeeper({
    defaultWidth: 1200,
    defaultHeight: 800
  })
  mainWindow = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    titleBarStyle: 'hidden',
    darkTheme: true,
    show: false,
    webPreferences: {
      backgroundThrottling: false,
      nodeIntegration: true
    }
  })
  mainWindowState.manage(mainWindow)
  mainWindow.loadFile(`${__dirname}/components/app/index.html`)
  mainWindow.setTouchBar(touchBar)
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

app.updateTouchBar = metadata => {
  artist.label = metadata.artist
  track.label = metadata.track
}

app.updateTouchBarTime = duration => {
  time.label = duration
}
