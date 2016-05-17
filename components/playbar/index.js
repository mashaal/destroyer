export default class Playbar {
  constructor (options) {
    this.element = document.querySelector('#playbar')
    this.range = this.element.querySelector('.range')
    this.buffer = this.element.querySelector('.buffer')
    this.play = this.element.querySelector('.play')
    this.previous = this.element.querySelector('.previous')
    this.next = this.element.querySelector('.next')
    this.toggle = options.toggle
    this.playPrevious = options.playPrevious
    this.playNext = options.playNext
    this.pause = options.pause
    this.unpause = options.unpause
    this.play.addEventListener('click', () => {
      this.toggle()
    })
    this.previous.addEventListener('click', () => {
      this.playPrevious()
    })
    this.next.addEventListener('click', () => {
      this.playNext()
    })
  }
  setBuffer (buffer) {
    this.buffer.style.transform = 'translateX(' + (buffer - 100) + '%)'
  }
  setRemaining (duration, progress) {
    let elapsed = (progress / duration) * 100
    this.range.style.transform = 'translateX(' + (elapsed - 100) + '%)'
  }
  set (status) {
    this.play.innerText = status
  }
  hide () {
    this.element.classList.add('hide')
  }
  show () {
    this.element.classList.remove('hide')
  }
}
