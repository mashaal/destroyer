import key from 'key'
import { store } from '../../client.js'

export default class Keyboard {
  constructor () {
    window.addEventListener('keydown', (event) => {
      if (event.keyCode === 27) store.dispatch({type: 'ESCAPE'})
      if (event.keyCode === 32 && !store.getState().search.display) {
        event.preventDefault()
        window.player.toggle()
      }
    })
  }
}
