const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const windowStateKeeper = require('electron-window-state')
let mainWindow
let player
const spawn = require('child_process').spawn
const ffmpeg = require('fluent-ffmpeg')
const fs = require('fs')
const userData = app.getPath('userData')
var extract = require('extract-zip')

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
    transparent: true,
    webPreferences: {
      backgroundThrottling: false
    }
  })
  mainWindowState.manage(mainWindow)
  mainWindow.loadURL('file://' + __dirname + '/components/app/index.html')
  mainWindow.on('closed', () => {
    app.stop()
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.stop()
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

app.playTrack = file => {
  app.stop()
  player = spawn(`${userData}/ffmpeg/ffplay`, [file.path, '-nodisp', '-autoexit'], {stdio: 'ignore'})
  ffmpeg.setFfprobePath(`${userData}/ffmpeg/ffprobe`)
  ffmpeg.ffprobe(file.path, (error, metadata) => {
    let duration
    if (error) throw error
    else if (metadata.format) {
      duration = metadata.format.duration
    } else duration = false
    mainWindow.webContents.executeJavaScript(`window.player.setDuration(${duration})`)
  })
  player.on('exit', continous)
  this.playing = true
  this.track = file
}

app.currentTrack = () => this.track

const continous = () => {
  next()
}

let next = () => mainWindow.webContents.executeJavaScript('window.player.next()')

app.stop = () => {
  if (player) player.removeListener('exit', continous)
  if (this.playing) {
    player.kill()
    mainWindow.webContents.executeJavaScript('window.player.stop()')
  }
  player = this.playing = this.track = null
}

app.pause = () => {
  this.playing = false
  mainWindow.webContents.executeJavaScript('window.player.pause()')
  player.kill('SIGSTOP')
}

app.resume = () => {
  this.playing = true
  mainWindow.webContents.executeJavaScript('window.player.resume()')
  player.kill('SIGCONT')
}

app.toggle = () => {
  if (this.playing) app.pause()
  else app.resume()
}

if (!fs.existsSync(`${userData}/ff.txt`)) {
  extract(__dirname + '/ffmpeg.zip', {dir: userData}, function (err) {
   fs.writeFile(`${userData}/ff.txt`, '🍑🍆')
  })
}
