import React, { Component } from 'react'
import Radium from 'radium'

@Radium
export default class Loading extends Component {
  render () {
    return (
      <section style={[styles.base, this.props.loading.display ? styles.show : styles.hide]}>
        <span style={styles.span}>{this.props.loading.message}</span>
      </section>
    )
  }
}

const styles = {
  base: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    backgroundColor: 'rgba(92, 67, 232, .8)',
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 60,
    transition: '.5s',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2em'
  },
  span: {
    margin: 'auto'
  },
  show: {
    opacity: 1,
    pointerEvents: 'auto'
  },
  hide: {
    opacity: 0,
    pointerEvents: 'none'
  }
}
