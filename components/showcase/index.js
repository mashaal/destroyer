export default class Showcase {
  constructor (options) {
    this.element = document.querySelector('#showcase')
    this.album = this.element.querySelector('.album')
    this.list = this.element.querySelector('ol')
    this.playAlbum = options.playAlbum
    this.playTrack = options.playTrack
    this.element.querySelector('.container').addEventListener('click', (event) => {
      if (event.target.classList.contains('album')) this.playAlbum(event.target.dataset.album)
      else this.close()
    })
    this.manageInterval()
    window.addEventListener('keydown', (event) => {
      if (event.keyCode === 27) this.close()
    })
    window.addEventListener('mousemove', () => {
      if (this.list.classList.contains('fade')) this.list.classList.remove('fade')
      clearInterval(this.interval)
      this.manageInterval()
    })
  }
  manageInterval () {
    this.interval = setInterval(() => {
      this.list.classList.add('fade')
    }, 5000)
  }
  display (album, cover, tracks) {
    this.album.dataset.album = album
    this.list.innerHTML = ''
    if (cover) this.album.style.backgroundImage = 'url("' + cover + '")'
    else this.album.style.backgroundImage = ''
    tracks.forEach((track) => {
      let pointer = document.createElement('li')
      pointer.setAttribute('data-track', track)
      pointer.innerText = track.Key.split('/')[1]
      this.list.appendChild(pointer)
      pointer.addEventListener('click', () => {
        this.playTrack(track)
      })
    })
    this.element.classList.add('show')
  }
  close () {
    this.element.classList.remove('show')
  }
}
