export default class Loading {
  constructor () {
    this.element = document.querySelector('#loading')
    window.addEventListener('keydown', (event) => {
      if (event.keyCode === 27) this.hide()
    })
  }
  show (message, error) {
    this.element.querySelector('span').innerText = message
    if (error) this.error()
    else this.element.classList.add('loading')
  }
  hide () {
    this.element.classList.remove('loading')
    this.element.classList.remove('error')
  }
  error () {
    this.element.classList.add('error')
    setTimeout(() => {
      this.hide()
    }, 5000)
  }
}
