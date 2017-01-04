import FuzzySearch from 'fuzzy-search'

export const searchReducer = (state = {display: false, fuzzy: false, input: ''}, action) => {
  switch (action.type) {
    case 'SEARCH': {
      state = {...state, display: true, input: action.input}
      break
    }
    case 'CONNECTED': {
      state = {...state, fuzzy: new FuzzySearch(action.albums, ['title', 'artist'], {
        caseSensitive: false
      })}
      break
    }
    case 'ESCAPE': {
      state = {...state, display: false, input: ''}
      break
    }
  }
  return state
}
