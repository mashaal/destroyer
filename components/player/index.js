import { store } from '../../client.js'
const fs = require('fs')

export default class Player {
  constructor () {
    this.ch1 = false
  }
  playAlbum (album) {
    store.dispatch({type: 'PLAY_ALBUM', album: album})
    this.local(store.getState().player.track)
  }
  playTrack (track) {
    store.dispatch({type: 'PLAY_TRACK', track: track})
    this.local(store.getState().player.track)
  }
  stop () {
    if (this.ch1.playing) this.ch1.stop()
    if (this.ch1.asset) this.ch1.asset.stop()
    store.dispatch({type: 'STOP'})
  }
  toggle () {
    if (this.ch1.playing) {
      this.ch1.pause()
      store.dispatch({type: 'PAUSE'})
    } else {
      this.ch1.play()
      store.dispatch({type: 'PLAY'})
    }
  }
  local (file) {
    fs.readFile(file.path, (error, data) => {
      if (error) throw error
      this.stop()
      store.dispatch({type: 'PLAY_TRACK', track: file})
      this.ch1 = AV.Player.fromBuffer(data)
      this.ch1.play()
      this.ch1.on('duration', (duration) => {
        this.ch1.on('progress', (progress) => {
          this.setCounter(Math.floor((duration - progress) / 1000))
          this.setPlaybar(duration, progress)
        })
      })
      this.ch1.on('buffer', (buffer) => {
        this.setBuffer(buffer)
      })
      this.ch1.on('metadata', (metadata) => {
        store.dispatch({type: 'METADATA', artist: metadata.artist, title: metadata.title, album: metadata.album})
      })
      this.ch1.on('error', (error) => {
        store.dispatch({type: 'ERROR', error: error})
      })
      this.ch1.on('end', () => {
        if (store.getState().player.next) this.local(store.getState().player.next)
        else store.dispatch({type: 'STOP'})
      })
    })
  }
  setCounter (seconds) {
    if (!this.counter) this.counter = document.querySelector('figure h4')
    let results = {}
    results.hours = Math.floor(seconds / 60 / 60)
    results.minutes = Math.floor((seconds / 60) % 60)
    results.seconds = Math.floor(seconds % 60)
    this.counter.innerText = '- ' + '00'.slice(results.hours.toString().length) + results.hours + ':' + '00'.slice(results.minutes.toString().length) + results.minutes + ':' + '00'.slice(results.seconds.toString().length) + results.seconds
  }
  setPlaybar (duration, progress) {
    if (!this.range) this.range = document.querySelector('[data-range]')
    let elapsed = (progress / duration) * 100
    this.range.style.transform = 'translateX(' + (elapsed - 100) + '%)'
  }
  setBuffer (buffer) {
    if (!this.buffer) this.buffer = document.querySelector('[data-buffer]')
    this.buffer.style.transform = 'translateX(' + (buffer - 100) + '%)'
  }
}
