import { store } from '../../client.js'
import { rafThrottle } from '../utilities'

export default class Keyboard {
  constructor () {
    this.keyEvent = rafThrottle(this.keyDown)
    window.addEventListener('keydown', this.keyEvent)
  }
  keyDown (event) {
    if (event.keyCode === 27) {
      event.preventDefault()
      store.dispatch({type: 'ESCAPE'})
    }
    if (event.keyCode === 32 && !store.getState().search.display) {
      event.preventDefault()
      window.player.toggle()
    }
  }
}
