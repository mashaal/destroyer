import React, { Component } from 'react'
import Album from './album.jsx'
import Radium from 'radium'
import { store } from '../../client.js'

@Radium
export default class Library extends Component {
  componentDidMount () {
    if (localStorage.getItem('newest') === 'true') store.dispatch({type: 'NEW'})
    else store.dispatch({type: 'ALPHA'})
  }
  render () {
    return (
    <ul ref='library' style={styles.base}>
      {this.props.library.albums.map(album => <Album album={album} key={album.root} container={this.refs.library} />)}
      <li style={styles.li}></li>
      <li style={styles.li}></li>
      <li style={styles.li}></li>
      <li style={styles.li}></li>
      <li style={styles.li}></li>
      <li style={styles.li}></li>
      <li style={styles.li}></li>
      <li style={styles.li}></li>
      <li style={styles.li}></li>
      <li style={styles.li}></li>
    </ul>
    )
  }
}

const styles = {
  base: {
    display: 'flex',
    flexWrap: 'wrap',
    boxSizing: 'border-box',
    position: 'fixed',
    bottom: 0,
    width: '100vw',
    height: '100vh',
    margin: 0,
    padding: '12.5vh 0 33vh',
    listStyle: 'none',
    overflow: 'scroll',
    transform: 'translate3d(0, 0, 0)'
  },
  li: {
    flex: '1 1 300px',
    padding: '1em 2em'
  }
}
