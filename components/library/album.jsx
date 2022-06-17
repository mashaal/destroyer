import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { store } from '../../client.js'
import { rafThrottle } from '../utilities'
import shallowCompare from 'react-addons-shallow-compare'
import inView from 'in-view'

export default class Album extends Component {
  constructor(props) {
    super()
    this.state = {
      active: false,
      fade: true
    }
  }
  componentDidMount() {
    this.album = ReactDOM.findDOMNode(this.refs.album)
    this.container = ReactDOM.findDOMNode(this.props.container)
    this.coverEvent = rafThrottle(this.coverHandler)
    this.container.addEventListener('scroll', this.coverEvent)
    this.coverHandler()
  }
  componentWillUnmount() {
    this.container.removeEventListener('scroll', this.coverEvent)
  }
  shouldComponentUpdate = (nextProps, nextState) => {
    return shallowCompare(this, nextProps, nextState)
  }
  coverHandler = () => {
    if (inView.is(this.album)) this.setState({ fade: false })
    else this.setState({ fade: true })
  }
  handleClick = () => {
    store.dispatch({ type: 'SHOWCASE', album: this.props.album })
  }
  activate = () => {
    this.setState({ active: true })
  }
  reset = () => {
    this.setState({ active: false })
  }
  render() {
    let cover = { backgroundColor: `#333333` }
    if (this.props.album.cover)
      cover = { backgroundImage: 'url("' + this.props.album.cover + '")' }
    return (
      <li
        onClick={this.handleClick}
        onMouseOver={this.activate}
        onMouseOut={this.reset}
        style={[
          styles.base,
          this.props.newest ? { order: this.props.album.time } : { order: -2 }
        ]}
      >
        <div style={this.state.fade ? styles.fade : styles.nonfade}>
          <div
            ref="album"
            style={[styles.cover, cover, this.state.active ? styles.zoom : '']}
          />
        </div>
        <span style={[this.state.active ? styles.active : '']}>
          {this.props.album.artist + ' - ' + this.props.album.title}
        </span>
      </li>
    )
  }
}

const styles = {
  base: {
    flex: '1 1 250px',
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
    transitionDuration: '.5s',
    transitionDelay: '.25s',
    willChange: 'transform'
  },
  fade: {
    opacity: 0,
    transform: 'scale(.9)',
    willChange: 'transform'
  }
}
