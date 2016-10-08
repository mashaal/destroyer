import React, { Component } from 'react'
import Radium from 'radium'
import { store } from '../../client.js'

@Radium
export default class Playbar extends Component {
  previous = () => {
    let player = window.player
    let previous = store.getState().player.previous
    if (previous) player.playTrack(previous)
    else player.stop()
  }
  next = () => {
    let player = window.player
    let next = store.getState().player.next
    if (next) player.playTrack(next)
    else player.stop()
  }
  toggle = () => {
    window.player.toggle()
  }
  render () {
    return (
      <div style={[styles.playbar, this.props.playbar.display ? styles.show : styles.hide]}>
        <div data-range style={[styles.range, styles.rangeBuffer]}></div>
        <div data-buffer style={[styles.buffer, styles.rangeBuffer]}></div>
        <div style={styles.panel}><span style={styles.span} key='previous' onClick={this.previous}>previous</span><span style={styles.span} key='toggle' onClick={this.toggle}>{this.props.playbar.toggle}</span><span style={styles.span} key='next' onClick={this.next}>next</span></div>
      </div>
    )
  }
}

const styles = {
  playbar: {
    position: 'fixed',
    pointerEvents: 'none',
    opacity: 0,
    bottom: 0,
    height: 85,
    zIndex: 8,
    userSelect: 'none',
    width: '100%',
    transition: '.666s'
  },
  panel: {
    height: 45,
    width: '100%',
    position: 'relative',
    textAlign: 'center',
    top: 40,
    borderTop: '2px solid #212121',
    background: 'rgba(33,33,33,.666)',
    lineHeight: '40px',
    fontSize: '1.5em',
    fontWeight: 200,
    fontStyle: 'italic'
  },
  span: {
    display: 'inline-block',
    padding: '0 0em 1em',
    width: '200px',
    cursor: 'pointer',
    transition: '.25s',
    ':hover': {
      background: 'rgba(92, 67, 232, .8)'
    }
  },
  rangeBuffer: {
    width: '100vw',
    transition: 'transform .125s',
    position: 'absolute',
    transform: 'translateX(-100%)'
  },
  range: {
    height: 40,
    top: 0,
    background: 'rgba(92, 67, 232, 0.8)'
  },
  buffer: {
    height: 6,
    top: 17,
    background: 'rgba(92, 67, 232, 0.8)'
  },
  show: {
    transform: 'translateY(0em)',
    opacity: 1,
    pointerEvents: 'auto'
  },
  hide: {
    transform: 'translateY(3em)'
  }
}
