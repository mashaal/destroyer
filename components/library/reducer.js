export const libraryReducer = (state = {covers: [], tracks: [], albums: [], newest: false}, action) => {
  switch (action.type) {
    case 'CONNECTED': {
      state = {...state, tracks: action.tracks, covers: action.covers, albums: action.albums}
      break
    }
    case 'ALPHA': {
      state = {...state, newest: false}
      localStorage.setItem('newest', false)
      break
    }
    case 'NEW': {
      state = {...state, newest: true}
      localStorage.setItem('newest', true)
      break
    }
    case 'SEARCH': {
      state = {...state, albums: action.albums}
      break
    }
    case 'CLEAR': {
      state = {...state, albums: action.albums}
      break
    }
  }
  return state
}
