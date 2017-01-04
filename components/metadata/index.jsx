import React, { Component } from 'react'
import Editor from './editor.jsx'
import Radium, { keyframes } from 'radium'
import CloseButton from '../close-button'
import { store } from '../../client.js'
import Errors from '../errors'
import shallowCompare from 'react-addons-shallow-compare'
const fs = require('fs')

@Radium
export default class Metadata extends Component {
  constructor (props) {
    super()
    this.state = {
      selected: false,
      index: false
    }
  }
  shouldComponentUpdate = (nextProps, nextState) => {
    return shallowCompare(this, nextProps, nextState)
  }
  select (index) {
    this.setState({selected: this.props.library.tracks[index], index: index})
  }
  reset = () => {
    this.setState({selected: false, index: false})
  }
  handleChange = event => {
    let selected = {...this.state.selected, [event.target.dataset.label]: event.target.value}
    this.setState({selected})
  }
  handleTrack = event => {
    let tracks
    if (event.target.dataset.label === 'artist') tracks = {...this.state.selected.track, artist: [event.target.value]}
    else tracks = {...this.state.selected.track, [event.target.dataset.label]: event.target.value}
    let selected = {...this.state.selected, track: tracks}
    this.setState({selected})
  }
  handleDisk = event => {
    let disks = {...this.state.selected.disk, [event.target.dataset.label]: event.target.value}
    let selected = {...this.state.selected, disk: disks}
    this.setState({selected})
  }
  handleDragEnter = event => {
    event.preventDefault()
    this.setState({drag: event.target.dataset.index})
  }
  handleDragOver = event => {
    event.preventDefault()
  }
  handleDragLeave = event => {
    event.preventDefault()
    this.setState({drag: -1})
  }
  handleDrop = event => {
    event.preventDefault()
    let album = this.props.library.albums[event.target.dataset.index]
    let read = fs.createReadStream(event.dataTransfer.files[0].path)
    let write = fs.createWriteStream(`${album.root}/cover.jpg`)
    read.pipe(write)
    album.cover = window.URL.createObjectURL(event.dataTransfer.files[0])
    write.on('close', () => {
      store.dispatch({type: 'ADD_ARTWORK', album: album, albums: this.props.library.albums, tracks: this.props.library.tracks})
    })
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
      <figure style={[styles.base, this.props.metadata.display ? styles.show : styles.hide]} id='metadata'>
        <CloseButton />
        <div style={{maxWidth: '60vw', width: '100%'}}>
          <div style={{padding: '2em'}}>
            <Errors errors={this.countErrors()} />
            {this.props.library.albums.map((album, index) => (
              <div key={index} style={{marginBottom: '2em', paddingBottom: '2em', borderBottom: '2px solid rgba(92, 67, 232, .8)'}} id={`album-${index}`}>
                <h1 style={styles.h1}>{album.artist} - {album.title}</h1>
                <h2 style={styles.h2}>{album.root}</h2>
                <div style={{display: 'flex', width: '100%', flexWrap: 'wrap'}}>
                  <div style={[styles.cover, album.cover ? {backgroundImage: `url("${album.cover}")`} : {backgroundImage:`url(../../library/default.jpg)`}, this.state.drag == index ? {border: '2px solid rgba(92, 67, 232, .8)'} : {border: '2px solid white'}]}
                  onDragEnter={this.handleDragEnter}
                  onDragOver={this.handleDragOver}
                  onDragLeave={this.handleDragLeave}
                  onDrop={this.handleDrop} data-index={index} />
                  <ul style={styles.ul}>
                    {this.props.library.tracks.map((track, tindex) => {
                      if ((track.album === album.title) && (track.artist === album.artist)) return <li key={`${tindex}-${index}`} style={[this.state.index === tindex ? styles.highlight : '', styles.li]} onClick={this.select.bind(this, tindex)}>{!track.artist || !track.title || !track.album ? <span style={styles.icon}>!</span> : ''}{track.path.replace(track.root, '')}</li>
                    })}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Editor selected={this.state.selected} display={this.props.metadata.display} disabled={this.props.metadata.disabled} onChange={this.handleChange} onTrack={this.handleTrack} onDisk={this.handleDisk} library={this.props.library} reset={this.reset} />
      </figure>
    )
  }
}

const rotateKeyframes = keyframes({
  '0%': {
    transform: 'scale(1) rotate(10deg)'
  },
  '100%': {
    transform: 'scale(1.125) rotate(-10deg)'
  }
})

const styles = {
  base: {
    display: 'flex',
    position: 'fixed',
    boxSizing: 'border-box',
    backgroundColor: '#212121',
    overflow: 'auto',
    top: '0vh',
    left: '0vw',
    width: '100vw',
    height: '100vh',
    padding: 0,
    margin: 0,
    zIndex: 45,
    transition: '.25s'
  },
  h1: {
    fontSize: '150%',
    margin: '0 0 .125em',
    padding: 0,
    lineHeight: 1
  },
  h2: {
    fontSize: '90%',
    color: '#ddd',
    fontWeight: 200,
    margin: '0 0 1em'
  },
  highlight: {
    background: 'rgba(92, 67, 232, .8)'
  },
  icon: {
    color: 'red',
    fontWeight: 900,
    padding: '0 0 0 0',
    marginRight: '.5em',
    display: 'inline-block',
    transformOrigin: '50% 50%',
    animation: 'x .33s infinite alternate ease-in-out',
    animationName: rotateKeyframes
  },
  cover: {
    width: '300px',
    height: '300px',
    flex: '0 0 300px',
    'transition': '.25s',
    backgroundSize: 'cover',
    backgroundPosition: 'center center'
  },
  ul: {
    listStyle: 'none',
    padding: 0,
    width: '100%',
    flex: '1 1 300px',
    margin: '0 1em'
  },
  li: {
    padding: '0 .5em',
    cursor: 'pointer',
    width: '100%',
    borderBottom: '2px solid transparent',
    transition: '.25s',
    ':hover': {
      borderBottom: '2px solid rgba(92, 67, 232, .8)'
    }
  },
  show: {
    pointerEvents: 'auto',
    opacity: 1
  },
  hide: {
    opacity: 0,
    pointerEvents: 'none'
  }
}
