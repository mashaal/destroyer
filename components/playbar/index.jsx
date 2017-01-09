import React, { Component } from 'react'
import Radium from 'radium'
import ReactDOM from 'react-dom'
import shallowCompare from 'react-addons-shallow-compare'
import { rafThrottle } from '../utilities'

@Radium
export default class Playbar extends Component {
  shouldComponentUpdate = (nextProps, nextState) => {
    return shallowCompare(this, nextProps, nextState)
  }
  scan = event => {
    event.preventDefault()
    window.player.scan(this.percentage)
  }
  previous = () => {
    let previous = this.props.player.previous
    if (previous) window.player.playTrack(previous)
    else window.player.stop()
  }
  next = () => {
    let next = this.props.player.next
    if (next) window.player.playTrack(next)
    else window.player.stop()
  }
  toggle = () => {
    window.player.toggle()
  }
  render () {
    return (
      <div style={[styles.playbar, this.props.playbar.display ? styles.show : styles.hide]}>
        <div data-range style={styles.range} />
        <div data-buffer style={styles.buffer} />
        <div style={styles.panel}><span style={styles.span} key='previous' onClick={this.previous}>previous</span><span style={styles.span} key='toggle' onClick={this.toggle}>{this.props.playbar.toggle}</span><span style={styles.span} key='next' onClick={this.next}>next</span></div>
        <div style={[styles.slider, this.state.hover ? {opacity: 1} : {opacity: 0}]} ref='slider' onClick={this.scan} />
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
    zIndex: 10,
    WebkitUserSelect: 'none',
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
    transition: '.5s',
    ':hover': {
      background: 'rgba(92, 67, 232, .8)'
    }
  },
  range: {
    height: 40,
    top: 0,
    left: 0,
    pointerEvents: 'none',
    background: 'rgba(92, 67, 232, 1)',
    transition: 'width .25s linear',
    width: 0,
    position: 'absolute'
  },
  buffer: {
    height: 40,
    width: '100vw',
    top: 0,
    position: 'absolute',
    background: 'rgba(92, 67, 232, 0.666)',
    cursor: 'not-allowed',
    zIndex: 20
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
