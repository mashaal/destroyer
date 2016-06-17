import FuzzySearch from 'fuzzy-search'
import key from 'key'

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
      if (event.keyCode === 27) this.reset()
      if (key.is(key.code.alnum, event.which)) {
        this.show()
      }
    })
    window.addEventListener('keyup', (event) => {
      if (key.is(key.code.alnum, event.which) || event.keyCode === 8) {
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
