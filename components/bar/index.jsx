import React, { Component } from 'react'
import Radium from 'radium'

@Radium
export default class Bar extends Component {
  render () {
    return (
      <nav style={styles.base} />
    )
  }
}

const styles = {
  base: {
    width: '100vw',
    height: '1.75em',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 22,
    webkitAppRegion: 'drag',
    backgroundColor: 'rgba(0, 0, 0, .125)'
  }
}
