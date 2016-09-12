import FuzzySearch from 'fuzzy-search'

export const searchReducer = (state = {display: false, fuzzy: false}, action) => {
  switch (action.type) {
    case 'SEARCH': {
      state = {...state, display: true}
      break
    }
    case 'CONNECTED': {
      state = {...state, fuzzy: new FuzzySearch(action.albums, ['title', 'artist'], {
        caseSensitive: false
      })}
      break
    }
    case 'CLEAR': {
      state = {...state, display: false}
      break
    }
  }
  return state
}
