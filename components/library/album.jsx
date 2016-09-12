import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Radium from 'radium'
import { store } from '../../client.js'

@Radium
export default class Album extends Component {
  constructor (props) {
    super()
    this.state = {
      active: false
    }
  }
  handleClick = () => {
    store.dispatch({type: 'SHOWCASE', album: this.props.album})
  }
  activate = () => {
    this.setState({active: true})
  }
  reset = () => {
    this.setState({active: false})
  }
  render () {
    let cover = ''
    if (this.props.album.cover) cover = {backgroundImage: 'url(' + encodeURI(this.props.album.cover) + ')'}
    return (
      <li onClick={this.handleClick} onMouseOver={this.activate} onMouseOut={this.reset} style={[styles.base, store.getState().library.newest ? {order: (this.props.album.time * -1)} : '' ]}>
        <div style={[styles.cover, cover, this.state.active ? styles.zoom : '']}></div>
        <span style={[this.state.active ? styles.active : '']}>{this.props.album.artist + ' - ' + this.props.album.title}</span>
      </li>
    )
  }
}

const styles = {
  base: {
    flex: '1 1 300px',
    padding: '1em 2em',
    lineHeight: '1.5em',
    cursor: 'pointer'
  },
  cover: {
    height: 0,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundColor: '#2b2b2b',
    paddingTop: '100%',
    transition: 'transform .25s',
    border: '2px solid #181818',
    marginBottom: '.5em',
    transform: 'scale(0.98)'
  },
  active: {
    borderBottom: '2px solid rgba(92, 67, 232, .8)'
  },
  zoom: {
    transform: 'scale(1)',
    border: '2px solid rgba(92, 67, 232, .8)'
  }
}
