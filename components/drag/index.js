export default class Drag {
  constructor (options) {
    this.element = options.element
    this.uploadCover = options.uploadCover
    this.element.addEventListener('dragenter', () => {
      this.overEvent(event)
    })
    this.element.addEventListener('dragover', () => {
      this.overEvent(event)
    })
    this.element.addEventListener('dragleave', () => {
      this.outEvent(event)
    })
    this.element.addEventListener('dragexit', () => {
      this.outEvent(event)
    })
    this.element.addEventListener('drop', () => {
      this.handleDrop(event)
    })
  }
  handleDrop (event) {
    event.stopPropagation()
    event.preventDefault()
    this.element.classList.remove('over')
    this.uploadCover(event.dataTransfer.files[0], this.element.dataset.album)
    this.element.style.backgroundImage = 'url(' + window.URL.createObjectURL(event.dataTransfer.files[0]) + ')'
    this.element.dataset.image = this.element.dataset.album + '/cover.jpg'
  }
  overEvent (event) {
    this.element.classList.add('over')
    event.dataTransfer.effectAllowed = 'all'
    event.stopPropagation()
    event.preventDefault()
    return false
  }
  outEvent (event) {
    this.element.classList.remove('over')
    event.stopPropagation()
    event.preventDefault()
    return false
  }
}
