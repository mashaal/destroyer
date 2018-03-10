const path = require('path')
import { sortTracks, sortAlbums } from '../utilities'
import { store } from '../../client.js'

export const libraryReducer = (
  state = { covers: [], tracks: [], albums: [], newest: false },
  action
) => {
  switch (action.type) {
    case 'CONNECTED': {
      state = {
        ...state,
        tracks: action.tracks,
        covers: action.covers,
        albums: action.albums
      }
      break
    }
    case 'ALPHA': {
      state = { ...state, newest: false }
      localStorage.setItem('newest', false)
      break
    }
    case 'NEW': {
      state = { ...state, newest: true }
      localStorage.setItem('newest', true)
      break
    }
    case 'SEARCH': {
      let albums = store.getState().search.fuzzy.search(action.input)
      state = { ...state, albums: albums }
      break
    }
    case 'ESCAPE': {
      let albums = store.getState().search.fuzzy.search('')
      state = { ...state, albums: albums }
      break
    }
    case 'REMOVE_ARTWORK': {
      let albums = [...state.albums]
      let index = false
      action.album.cover = false
      albums.some((album, i) => {
        if (album.root === action.album.root) {
          index = i
          return
        }
      })
      if (index) albums[index] = action.album
      state = { ...state, albums: albums }
      break
    }
    case 'ADD_ARTWORK': {
      let albums = [...state.albums]
      let index = false
      albums.some((album, i) => {
        if (
          album.root === action.album.root &&
          album.artist === action.album.artist &&
          album.title === action.album.title
        ) {
          index = i
          return
        }
      })
      if (index) albums[index] = action.album
      state = { ...state, albums: albums }
      break
    }
    case 'UPDATE_METADATA': {
      let tracks = [...state.tracks]
      let index
      tracks.some((track, i) => {
        if (track.path === action.track.path) {
          index = i
          return
        }
      })
      tracks[index] = action.track

      let albums = [...state.albums]
      let find = albums.filter(
        album =>
          album.title === action.track.album &&
          album.artist === action.track.artist
      )
      if (find.length <= 0) {
        let cover = false
        if (
          state.covers.indexOf(path.join(action.track.root, 'cover.jpg')) >= 0
        )
          cover = path.join(action.track.root, 'cover.jpg')
        albums.push({
          artist: action.track.artist,
          title: action.track.album,
          time: action.track.time,
          root: action.track.root,
          cover: cover
        })
      }

      sortTracks(tracks)
      sortAlbums(albums)

      albums.forEach((album, index) => {
        let found = false
        tracks.some(track => {
          if (track.album === album.title && track.artist === album.artist) {
            found = true
            return
          }
        })
        if (!found) albums.splice(index, 1)
      })

      state = { ...state, tracks: tracks, albums: albums }
      break
    }
  }
  return state
}
