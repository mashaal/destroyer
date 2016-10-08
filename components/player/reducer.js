import { store } from '../../client.js'
import Player from './index.js'

export const playerReducer = (state = {}, action) => {
  switch (action.type) {
    case 'PLAY_ALBUM': {
      let matching = []
      let next
      store.getState().library.tracks.forEach((track) => {
        if (track.album === action.album.title) matching.push(track)
      })
      if (!matching[1]) next = false
      else next = matching[1]
      state = {...state, track: matching[0], next: next, previous: false}
      break
    }
    case 'PLAY_TRACK': {
      let index = store.getState().library.tracks.indexOf(action.track)
      let next = store.getState().library.tracks[index + 1]
      let previous = store.getState().library.tracks[index - 1]
      if (!next || next.album !== action.track.album) next = false
      if (!previous || previous.album !== action.track.album) previous = false
      state = {...state, track: action.track, next: next, previous: previous}
      break
    }
  }
  return state
}
