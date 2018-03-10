import walk from 'walk'
import { store } from '../../client.js'
import { sortTracks, sortAlbums } from '../utilities'
const path = require('path')
const mm = require('musicmetadata')
const fs = require('fs')
const dateFns = require('date-fns')
const minimatch = require('minimatch')

export default class Local {
  collection(fileList) {
    this.paths = []
    this.tracks = []
    this.covers = []
    this.albums = []
    for (var index = 0; index < fileList.length; index++) {
      this.paths.push({ path: fileList[index].path })
      if (index === fileList.length - 1) this.scan(0)
    }
  }
  scan(index) {
    if (index >= this.paths.length) {
      localStorage.setItem('fileList', JSON.stringify(this.paths))
      this.end()
    } else {
      this.directory = walk.walk(this.paths[index].path, { followLinks: false })
      this.directory.on('file', (root, fileStats, next) => {
        let fileName = root + '/' + fileStats.name
        if (
          ['flac', 'm4a', 'mp3', 'mp4', 'aac'].indexOf(
            fileName.split('.').pop()
          ) > -1
        ) {
          let rs = fs.createReadStream(fileName)
          mm(rs, (error, metadata) => {
            if (error) {
              console.log('error', error)
              next()
            } else {
              metadata.artist = metadata.artist[0] || ''
              metadata.title = metadata.title || ''
              metadata.album = metadata.album || ''
              metadata.root = root
              metadata.path = fileName
              metadata.time =
                Number(
                  dateFns.format(new Date(fileStats.ctime), 'YYYYMMDDmm')
                ) * -1
              this.tracks.push(metadata)
              store.dispatch({
                type: 'SCANNING',
                message: 'SCANNING: ' + metadata.artist + ' - ' + metadata.album
              })
              rs.close()
            }
          })
          rs.on('close', () => {
            next()
          })
        } else if (
          fileStats.name.indexOf('.jpg') > 0 ||
          fileStats.name.indexOf('.png') > 0
        ) {
          this.covers.push(fileName)
          next()
        } else next()
      })
      this.directory.on('end', () => {
        this.scan(index + 1)
      })
    }
  }
  end() {
    this.tracks.forEach((track, index) => {
      let find = this.albums.filter(
        album => album.title === track.album && album.artist === track.artist
      )
      if (find.length <= 0) {
        let cover = false
        if (this.covers.indexOf(path.join(track.root, 'cover.jpg')) >= 0) {
          cover = path.join(track.root, 'cover.jpg')
        } else {
          this.covers.forEach(c => {
            if (
              minimatch(c, `*.+(jpg|png)`, { matchBase: true }) &&
              c.indexOf(track.root) >= 0
            ) {
              cover = c
            }
          })
        }
        this.albums.push({
          artist: track.artist,
          title: track.album,
          time: track.time,
          root: track.root,
          cover: cover
        })
      }
    })
    sortAlbums(this.albums)
    sortTracks(this.tracks)
    store.dispatch({
      type: 'CONNECTED',
      tracks: this.tracks,
      covers: this.covers,
      albums: this.albums,
      path: this.paths
    })
  }
}
