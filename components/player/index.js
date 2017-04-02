import { store } from '../../client.js'
import { remote } from 'electron'

export default class Player {
  constructor () {
    this.playing = false
    this.audio = document.getElementById('xxx')
    let interval
    this.audio.onplaying = () => {
      calc()
    }
    this.audio.onseeked = () => {
      calc()
    }
    this.audio.onended = () => {
      this.next()
    }
    let calc = () => {
      clearInterval(interval)
      interval = setInterval(() => {
        let d = this.audio.duration
        let p = this.audio.currentTime
        this.setCounter(d - p)
        this.setPlaybar(d, p)
      }, 50)
    }
  }
  playAlbum (album) {
    store.dispatch({type: 'PLAY_ALBUM', album: album})
    this.local(store.getState().player.track)
  }
  playTrack (track) {
    store.dispatch({type: 'PLAY_TRACK', track: track})
    this.local(track)
  }
  next () {
    if (store.getState().player.next) this.playTrack(store.getState().player.next)
    else this.stop()
  }
  stop () {
    store.dispatch({type: 'STOP'})
  }
  toggle () {
    if (this.playing) this.pause()
    else this.resume()
  }
  pause () {
    this.audio.pause()
    this.playing = false
    store.dispatch({type: 'PAUSE'})
  }
  resume () {
    this.audio.play()
    this.playing = true
    store.dispatch({type: 'PLAY'})
  }
  scan (percentage) {
    this.audio.currentTime = percentage * this.audio.duration
  }
  local (track) {
    store.dispatch({type: 'METADATA', artist: track.artist, title: track.title, album: track.album})
    remote.app.updateTouchBar({artist: track.artist, track: track.title})
    this.audio.src = track.path
    this.audio.play()
    this.playing = true
  }
  setCounter (seconds) {
    if (!this.counter) this.counter = document.querySelector('figure h4')
    let results = {}
    results.hours = Math.floor(seconds / 60 / 60)
    results.minutes = Math.floor((seconds / 60) % 60)
    results.seconds = Math.floor(seconds % 60)
    let time = '- ' + '00'.slice(results.hours.toString().length) + results.hours + ':' + '00'.slice(results.minutes.toString().length) + results.minutes + ':' + '00'.slice(results.seconds.toString().length) + results.seconds
    this.counter.innerText = time
    remote.app.updateTouchBarTime(time)
  }
  setPlaybar (duration, progress) {
    if (!this.range) this.range = document.querySelector('[data-range]')
    let elapsed = (((progress / duration) * 100)) + '%'
    this.range.style.width = elapsed
  }
}
