import { store } from '../../client.js'
import { remote } from 'electron'
const addSeconds = require('date-fns/add_seconds')
const differenceInSeconds = require('date-fns/difference_in_seconds')

export default class Player {
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
  }
  stop () {
    remote.app.stop()
    store.dispatch({type: 'STOP'})
  }
  toggle () {
    remote.app.toggle()
  }
  pause () {
    clearInterval(this.interval)
    store.dispatch({type: 'PAUSE'})
  }
  resume () {
    this.setDuration(this.remaining, true)
    store.dispatch({type: 'PLAY'})
  }
  setDuration (duration = 0, previous) {
    if (!previous) this.totalDuration = duration
    let end = addSeconds(new Date(), duration)
    this.seconds = differenceInSeconds(end, new Date())
    clearInterval(this.interval)
    this.setCounter(this.seconds)
    this.interval = setInterval(() => {
      this.remaining = differenceInSeconds(end, new Date())
      if (this.remaining < 1) {
        this.setCounter(0)
        clearInterval(this.interval)
      } else {
        this.setCounter(this.remaining)
        this.setPlaybar(this.totalDuration, this.remaining)
      }
    }, 666)
  }
  clearInterval () {
    clearInterval(this.interval)
  }
  local (track) {
    remote.app.playTrack(track)
    store.dispatch({type: 'METADATA', artist: track.artist, title: track.title, album: track.album})
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
    let elapsed = ((progress / duration) * 100)
    this.range.style.width = `${100 - elapsed}%`
  }
}
