import React, { Component } from 'react'
import Loading from '../loading'
import Admin from '../admin'
import Search from '../search'
import Status from '../status'
import Library from '../library'
import Showcase from '../showcase'
import Playbar from '../playbar'
import Radium, {StyleRoot, Style} from 'radium'


@Radium
export default class App extends Component {
  render () {
    return (
      <StyleRoot>
        <Style rules={styles} />
        <Admin admin={this.props.admin} />
        <Library library={this.props.library} />
        <Showcase showcase={this.props.showcase} />
        <Status status={this.props.status} />
        <Loading loading={this.props.loading} />
        <Playbar playbar={this.props.playbar} />
        <Search search={this.props.search} />
      </StyleRoot>
    )
  }
}

const styles = {
  html: {
    textSizeAdjust: '100%',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    WebkitTapHighlightColor: 'transparent'
  },
  body: {
    margin: 0,
    padding: 0,
    lineHeight: 1.5,
    fontFamily: 'averia-serif, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
    color: 'white',
    backgroundColor: '#212121'
  },
  '::selection': {
    backgroundColor: 'rgba(92, 67, 232, 1)',
    opacity: 0
  }
}
