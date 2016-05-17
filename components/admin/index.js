export default class Admin {
  constructor (options) {
    this.element = document.querySelector('form')
    this.key = this.element.querySelector('[name="key"]')
    this.secret = this.element.querySelector('[name="secret"]')
    this.bucket = this.element.querySelector('[name="bucket"]')
    this.connect = options.connect
    this.key.value = localStorage.getItem('key')
    this.secret.value = localStorage.getItem('secret')
    this.bucket.value = localStorage.getItem('bucket')
    this.element.addEventListener('submit', (event) => {
      event.preventDefault()
      if (!this.key.checkValidity()) this.error(this.key)
      else this.removeError(this.key)
      if (!this.secret.checkValidity()) this.error(this.secret)
      else this.removeError(this.secret)
      if (!this.bucket.checkValidity()) this.error(this.bucket)
      else this.removeError(this.bucket)
      if (this.key.checkValidity() && this.secret.checkValidity() && this.bucket.checkValidity()) {
        this.connect(this.key.value, this.secret.value, this.bucket.value)
        this.store()
      }
    })
    window.addEventListener('keydown', (event) => {
      if (event.keyCode === 27) this.hide()
    })
  }
  show () {
    this.element.classList.add('show')
  }
  hide () {
    this.element.classList.remove('show')
  }
  error (input) {
    input.classList.add('error')
  }
  removeError (input) {
    input.classList.remove('error')
  }
  store () {
    localStorage.setItem('key', this.key.value)
    localStorage.setItem('secret', this.secret.value)
    localStorage.setItem('bucket', this.bucket.value)
  }
}
