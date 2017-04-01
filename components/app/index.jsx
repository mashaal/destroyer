import React from 'react'
import Loading from '../loading'
import Admin from '../admin'
import Bar from '../bar'
import Search from '../search'
import Status from '../status'
import Library from '../library'
import Showcase from '../showcase'
import Playbar from '../playbar'
import Radium, {StyleRoot, Style} from 'radium'

const App = props =>
  <StyleRoot>
    <Style rules={styles} />
    <Bar />
    <Admin admin={props.admin} />
    <Library library={props.library} player={props.player} />
    <Showcase showcase={props.showcase} player={props.player} />
    <Status status={props.status} />
    <Loading loading={props.loading} />
    <Playbar playbar={props.playbar} player={props.player} />
    <Search search={props.search} admin={props.admin} metadata={props.metadata} />
  </StyleRoot>

export default Radium(App)

const styles = {
  html: {
    textSizeAdjust: '100%',
    WebkitFontSmoothing: 'antialiased'
  },
  body: {
    margin: 0,
    padding: 0,
    lineHeight: 1.5,
    fontFamily: 'averia-serif, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
    color: 'white',
    backgroundColor: '#212121'
  },
  input: {
    fontFamily: 'averia-serif, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif'
  },
  button: {
    fontFamily: 'averia-serif, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif'
  },
  '::selection': {
    backgroundColor: 'rgba(92, 67, 232, 1)',
    opacity: 0
  }
}
