import { store } from '../../client.js'
import Player from './index.js'

export const playerReducer = (state = {}, action) => {
  switch (action.type) {
    case 'PLAY_ALBUM': {
      let matching = []
      let next
      store.getState().library.tracks.forEach((track) => {
        if ((track.album === action.album.title) && (track.artist === action.album.artist)) matching.push(track)
      })
      if (!matching[1]) next = false
      else next = matching[1]
      let albumIndex = findAlbums(matching[0])
      state = {...state, track: matching[0], next: next, previous: false, albumIndex: albumIndex}
      break
    }
    case 'PLAY_TRACK': {
      let library = store.getState().library
      let index = library.tracks.indexOf(action.track)
      let next = library.tracks[index + 1]
      let previous = library.tracks[index - 1]
      let albumIndex = findAlbums(action.track)
      if (!next || next.album !== action.track.album) next = false
      if (!previous || previous.album !== action.track.album) previous = false
      state = {...state, track: action.track, next: next, previous: previous, albumIndex: albumIndex}
      break
    }
  }
  return state
}

let findAlbums = track => {
  let albums = store.getState().library.albums
  let albumIndex = 0
  albums.some((album, index) => {
    if ((album.title === track.album) && (album.artist === track.artist)) {
      albumIndex = index
      return
    }
  })
  return albumIndex
}
