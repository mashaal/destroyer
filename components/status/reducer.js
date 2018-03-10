export const statusReducer = (
  state = { display: false, artist: ' ', title: ' ', album: ' ' },
  action
) => {
  switch (action.type) {
    case 'METADATA': {
      state = {
        ...state,
        display: true,
        artist: action.artist,
        title: action.title,
        album: action.album
      }
      break
    }
    case 'PLAY_ALBUM': {
      state = { ...state, display: false }
      break
    }
    case 'PLAY_TRACK': {
      state = { ...state, display: false }
      break
    }
    case 'STOP': {
      state = { ...state, display: false }
      break
    }
  }
  return state
}
