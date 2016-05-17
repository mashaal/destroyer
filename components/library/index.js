import Drag from '../drag'

export default class Library {
  constructor (options) {
    this.element = document.querySelector('ul')
    this.showcase = options.showcase
    this.getCover = options.getCover
    this.uploadCover = options.uploadCover
    this.clear()
  }
  clear () {
    this.albums = []
    this.covers = []
    this.tracks = []
  }
  add (tracks, covers) {
    this.clear()
    this.covers = covers
    this.tracks = tracks
    this.parseAlbums(tracks)
  }
  parseAlbums (tracks) {
    tracks.forEach((track) => {
      let title = track.split('/')[0]
      if (this.albums.indexOf(title) === -1) this.albums.push(title)
    })
    this.showAlbums(this.albums)
  }
  showAlbums () {
    this.element.innerHTML = ''
    this.albums.forEach((album) => {
      let pointer = document.createElement('li')
      let cover = document.createElement('div')
      let title = document.createElement('span')
      pointer.dataset.album = album
      cover.dataset.album = album
      title.dataset.album = album
      new Drag({
        element: cover,
        uploadCover: this.uploadCover
      })
      let checkCover = this.covers.indexOf(album + '/cover.jpg')
      if (checkCover > -1) cover.dataset.image = this.covers[checkCover]
      else cover.dataset.image = ''
      title.innerText = album
      pointer.appendChild(cover)
      pointer.appendChild(title)
      this.element.appendChild(pointer)
      pointer.addEventListener('click', (event) => {
        let tracks = []
        this.tracks.forEach((track) => {
          if (track.split('/')[0] === album) tracks.push(track)
        })
        let url = ''
        let checkCover = this.covers.indexOf(album + '/cover.jpg')
        if (checkCover > -1) url = this.getCover(checkCover)
        this.showcase(event.target.dataset.album, url, tracks)
      })
      let listener = (event) => {
        this.coverHandler(pointer, cover, checkCover, listener)
      }
      setTimeout(() => {
        this.coverHandler(pointer, cover, checkCover, listener)
      }, 500)
      this.element.addEventListener('scroll', listener, false)
    })
    let i = 0
    while (i < 10) {
      this.element.appendChild(document.createElement('li'))
      i++
    }
  }
  static isInViewport (element) {
    var rect = element.getBoundingClientRect()
    var html = document.documentElement
    return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || html.clientHeight) &&
    rect.right <= (window.innerWidth || html.clientWidth)
    )
  }
  coverHandler (pointer, cover, checkCover, listener) {
    if (Library.isInViewport(cover)) {
      let url = ''
      if (checkCover > -1) url = this.getCover(checkCover)
      cover.style.backgroundImage = 'url("' + url + '")'
      this.element.removeEventListener('scroll', listener, false)
    }
  }
}
