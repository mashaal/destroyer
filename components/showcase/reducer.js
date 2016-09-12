import { store } from '../../client.js'

export const showcaseReducer = (state = { album: { cover: ''}, tracks: []} , action) => {
  switch (action.type) {
    case 'SHOWCASE': {
      let matching = []
      store.getState().library.tracks.forEach((track) => {
        if (track.album === action.album.title) matching.push(track)
      })
      state = {...state, display: true, album: action.album, tracks: matching}
      break
    }
    case 'CLOSE_SHOWCASE': {
      state = {...state, display: false}
      break
    }
  }
  return state
}
