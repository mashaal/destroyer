import FuzzySearch from 'fuzzy-search'

export default class Search {
  constructor (options) {
    this.element = document.querySelector('form.search')
    this.input = this.element.querySelector('input')
    this.albums = options.albums
    this.filter = options.filter
    this.resetFilter = options.reset
    this.close = this.element.querySelector('.x')
    this.fuzzy = new FuzzySearch(this.albums, ['title'], {
      caseSensitive: false
    })
    this.close.addEventListener('click', () => {
      this.reset()
    })
    window.addEventListener('keydown', (event) => {
      if (document.querySelector('.admin').classList.contains('show')) return
      if (event.keyCode === 27 || this.input.value === '') this.reset()
      if ((57 >= event.keyCode && event.keyCode >= 48)
        || (105 >= event.keyCode && event.keyCode >= 96)
        || (90 >= event.keyCode && event.keyCode >= 65)
        || (40 >= event.keyCode && event.keyCode >= 37)
        || (event.keyCode === 8) || (event.keyCode === 46)
        || (event.keyCode === 13) || (event.keyCode === 32)) {
        this.show()
      }
    })
    window.addEventListener('keyup', (event) => {
      if ((57 >= event.keyCode && event.keyCode >= 48)
        || (105 >= event.keyCode && event.keyCode >= 96)
        || (90 >= event.keyCode && event.keyCode >= 65)
        || (40 >= event.keyCode && event.keyCode >= 37)
        || (event.keyCode === 8) || (event.keyCode === 46)
        || (event.keyCode === 13) || (event.keyCode === 32)) {
        let albums = this.fuzzy.search(this.input.value)
        this.filter(albums)
      }
    })
  }
  reset () {
    this.input.value = ''
    this.resetFilter()
    this.hide()
  }
  show () {
    this.input.focus()
    this.element.classList.add('show')
  }
  hide () {
    this.element.classList.remove('show')
  }
}
