import React, { Component } from 'react'
import Album from './album.jsx'
import shallowCompare from 'react-addons-shallow-compare'
import { store } from '../../client.js'

export default class Library extends Component {
  componentDidMount() {
    if (localStorage.getItem('newest') === 'true')
      store.dispatch({ type: 'NEW' })
    else store.dispatch({ type: 'ALPHA' })
  }
  shouldComponentUpdate = (nextProps, nextState) => {
    return shallowCompare(this, nextProps, nextState)
  }
  render() {
    return (
      <ul
        ref="library"
        style={[
          styles.base,
          this.props.player.track
            ? { padding: '12.5vh 0 33vh' }
            : { padding: '2em 0 33vh' }
        ]}
      >
        {this.props.library.albums.map((album, index) => {
          if (album.title && album.artist)
            return (
              <Album
                album={album}
                key={index}
                container={this.refs.library}
                newest={this.props.library.newest}
              />
            )
        })}
        <li style={styles.li} />
        <li style={styles.li} />
        <li style={styles.li} />
        <li style={styles.li} />
        <li style={styles.li} />
        <li style={styles.li} />
        <li style={styles.li} />
        <li style={styles.li} />
        <li style={styles.li} />
        <li style={styles.li} />
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
    flex: '1 1 250px',
    padding: '1em 2em',
    order: 10
  }
}
