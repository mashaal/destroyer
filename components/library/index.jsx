import React, { Component } from 'react'
import Album from './album.jsx'
import Radium from 'radium'
import Errors from '../errors'
import shallowCompare from 'react-addons-shallow-compare'
import { store } from '../../client.js'

@Radium
export default class Library extends Component {
  componentDidMount () {
    if (localStorage.getItem('newest') === 'true') store.dispatch({type: 'NEW'})
    else store.dispatch({type: 'ALPHA'})
  }
  shouldComponentUpdate = (nextProps, nextState) => {
    return shallowCompare(this, nextProps, nextState)
  }
  countErrors = () => {
    let meta = 0
    let art = 0
    this.props.library.tracks.forEach(track => {
      if (!track.artist || !track.title || !track.album) meta++
    })
    this.props.library.albums.forEach(album => {
      if (!album.cover) art++
    })
    return {meta, art}
  }
  render () {
    return (
    <ul ref='library' style={[styles.base, this.props.player.track ? {padding: '12.5vh 0 33vh'} : {padding: '2em 0 33vh'}]}>
      <div style={[{flexBasis: '100%', padding: '0 2em 0', cursor: 'pointer'}, {order: -999999999999}]} onClick={()=> store.dispatch({type: 'EDIT_METADATA'})}>
        <Errors errors={this.countErrors()} />
      </div>
      {this.props.library.albums.map((album, index) => {
        if (album.title && album.artist) return (<Album album={album} key={index} container={this.refs.library} newest={this.props.library.newest} />)
      })}
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
    WebkitUserSelect: 'none',
    listStyle: 'none',
    overflow: 'scroll',
    transition: 'padding .5s',
    transform: 'translate3d(0, 0, 0)'
  },
  li: {
    flex: '1 1 300px',
    padding: '1em 2em',
    order: 10
  }
}
