import { scrollToElement } from 'scroll-animator'
import { store } from '../../client.js'

export const metadataReducer = (state = {display: false, disabled: false}, action) => {
  switch (action.type) {
    case 'EDIT_METADATA': {
      if (!state.display) {
        let player = store.getState().player || false
        if (player.track) {
          scrollToElement({
            container: document.querySelector('#metadata'),
            target: document.querySelector(`#album-${player.albumIndex}`),
            duration: 2000,
            offsetY: -32
          })
        }
      }
      state = {...state, display: !state.display}
      break
    }
    case 'DISABLE_METADATA': {
      state = {...state, disabled: true}
      break
    }
    case 'UPDATE_METADATA': {
      state = {...state, disabled: false}
      break
    }
    case 'ESCAPE': {
      state = {...state, display: false}
      break
    }
  }
  return state
}
