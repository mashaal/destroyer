export default class Feature {
  constructor () {
    this.element = document.querySelector('figure')
  }
  clearMeta () {
    this.element.querySelector('h1').innerHTML = '&nbsp;'
    this.element.querySelector('h2').innerHTML = '&nbsp;'
    this.element.querySelector('h3').innerHTML = '&nbsp;'
    this.element.querySelector('h4').innerHTML = '&nbsp;'
  }
  setMeta (artist, title, album) {
    this.element.querySelector('h1').innerText = artist
    this.element.querySelector('h2').innerText = title
    this.element.querySelector('h3').innerText = album
  }
  hide () {
    this.element.classList.add('hide')
  }
  show () {
    this.element.classList.remove('hide')
  }
  setRemaining (seconds) {
    var results = {}
    results.hours = Math.floor(seconds / 60 / 60)
    results.minutes = Math.floor((seconds / 60) % 60)
    results.seconds = Math.floor(seconds % 60)
    this.element.querySelector('h4').innerText = '- ' + '00'.slice(results.hours.toString().length) + results.hours + ':' + '00'.slice(results.minutes.toString().length) + results.minutes + ':' + '00'.slice(results.seconds.toString().length) + results.seconds
  }
}
