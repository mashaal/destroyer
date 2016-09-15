import walk from 'walk'
import moment from 'moment'
import { store } from '../../client.js'
const mm = require('musicmetadata')
const fs = require('fs')
const { dialog } = require('electron').remote

export default class Local {
  collection (fileList) {
    this.paths = []
    this.tracks = []
    this.covers = []
    this.albums = []
    for (var index = 0; index < fileList.length; index++) {
      this.paths.push({path: fileList[index].path})
      if (index === fileList.length - 1) this.scan(0)
    }
  }
  scan (index) {
    if (index > this.paths.length - 1) this.end()
    else {
      this.directory = walk.walk(this.paths[index].path, {followLinks: false})
      this.directory.on('file', (root, fileStats, next) => {
        let fileName = root + '/' + fileStats.name
        if (['flac', 'm4a', 'mp3', 'mp4', 'aac'].indexOf(fileName.split('.').pop()) > -1) {
          let rs = fs.createReadStream(fileName)
          mm(rs, (error, metadata) => {
            if (error || !metadata.artist[0] || !metadata.album) next()
            else {
              store.dispatch({type: 'SCANNING', message: 'SCANNING: ' + metadata.artist[0] + ' - ' + metadata.album})
              metadata.root = root
              metadata.path = fileName
              metadata.time = moment(fileStats.mtime).unix()
              this.tracks.push(metadata)
              rs.destroy()
            }
          })
          rs.on('close', () => {
            next()
          })
        } else if (fileStats.name === 'cover.jpg') {
          this.covers.push(fileName)
          next()
        } else next()
      })
      this.directory.on('end', () => {
        this.scan(index + 1)
      })
    }
  }
  end () {
    localStorage.setItem('fileList', JSON.stringify(this.paths))
    this.tracks.forEach((track) => {
      let find = this.albums.filter(album => album.title === track.album)
      if (find.length <= 0) {
        let cover = false
        if (this.covers.indexOf(track.root + '/cover.jpg') >= 0) cover = track.root + '/cover.jpg'
        this.albums.push({artist: track.artist[0], title: track.album, time: track.time, root: track.album, cover: cover})
      }
      this.albums.sort((a, b) => {
        if(a.artist < b.artist) return -1
        if(a.artist > b.artist) return 1
        return 0
      })
    })
    store.dispatch({type: 'CONNECTED', tracks: this.tracks, covers: this.covers, albums: this.albums, path: this.paths})
  }
}
