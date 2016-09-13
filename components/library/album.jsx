import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Radium from 'radium'
import { store } from '../../client.js'
import inView from 'in-view'

@Radium
export default class Album extends Component {
  constructor (props) {
    super()
    this.state = {
      active: false,
      cover: '',
      fade: true
    }
  }
  componentDidMount () {
    this._mounted = true
    this.album = ReactDOM.findDOMNode(this.refs.album)
    this.container = ReactDOM.findDOMNode(this.props.container)
    this.container.addEventListener('scroll', this.coverHandler)
    this.coverHandler()
  }
  componentWillUnmount () {
    this._mounted = false
    this.container.removeEventListener('scroll', this.coverHandler)
  }
  coverHandler = () => {
    if (inView.is(this.album)) this.setState({cover: this.props.album.cover, fade: false})
    else this.setState({cover: '', fade: true})
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
    if (this.props.album.cover) cover = {backgroundImage: 'url("' + this.state.cover + '")'}
    return (
      <li onClick={this.handleClick} onMouseOver={this.activate} onMouseOut={this.reset} style={[styles.base, store.getState().library.newest ? {order: (this.props.album.time * -1)} : '' ]}>
        <div style={this.state.fade ? styles.fade : styles.nonfade}>
          <div ref='album' style={[styles.cover, cover, this.state.active ? styles.zoom : '']}></div>
        </div>
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
    transition: 'transform .25s, opacity .25s',
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
  },
  nonfade: {
    transition: '.5s',
    transitionDelay: '.25s'
  },
  fade: {
    opacity: 0,
    transform: 'scale(.9)'
  }
}
