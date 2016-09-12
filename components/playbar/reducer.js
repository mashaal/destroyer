export const playbarReducer = (state = {display: false, toggle: 'play'}, action) => {
  switch (action.type) {
    case 'METADATA': {
      state = {...state, display: true, toggle: 'pause'}
      break
    }
    case 'PLAY_ALBUM': {
      state = {...state, display: false, toggle: 'pause'}
      break
    }
    case 'PLAY_TRACK': {
      state = {...state, display: false, toggle: 'pause'}
      break
    }
    case 'STOP': {
      state = {...state, display: false, toggle: 'play'}
      break
    }
    case 'PLAY': {
      state = {...state, display: true, toggle: 'pause'}
      break
    }
    case 'PAUSE': {
      state = {...state, display: true, toggle: 'play'}
      break
    }
  }
  return state
}
