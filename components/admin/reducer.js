export const adminReducer = (state = {display: false}, action) => {
  switch (action.type) {
    case 'ADMIN': {
      state = {...state, display: true}
      break
    }
    case 'ESCAPE': {
      state = {...state, display: false}
      break
    }
    case 'DROP': {
      state = {...state, display: false}
      break
    }
  }
  return state
}
