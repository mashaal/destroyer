export const loadingReducer = (state = {display: false, message: '', error: false}, action) => {
  switch (action.type) {
    case 'CONNECTED': {
      state = {...state, display: false, message: '', error: false}
      break
    }
    case 'SCANNING': {
      state = {...state, display: true, message: action.message, error: false}
      break
    }
    case 'PLAY_ALBUM': {
      state = {...state, display: true, message: action.album.title, error: false}
      break
    }
    case 'PLAY_TRACK': {
      let message = action.track.name || action.track.title
      state = {...state, display: true, message: message, error: false}
      break
    }
    case 'METADATA': {
      state = {...state, display: false, message: '', error: false}
      break
    }
    case 'ERROR': {
      state = {...state, display: true, message: action.error.message, error: true}
      break
    }
    case 'ESCAPE': {
      state = {...state, display: false, message: '', error: false}
      break
    }
  }
  return state
}
