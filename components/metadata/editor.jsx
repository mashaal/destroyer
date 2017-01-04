import React, { Component } from 'react'
import Input from '../input'
import Button from '../button'
import Radium from 'radium'
import TrackNumbers from './track-numbers.jsx'
import { store } from '../../client.js'
import shallowCompare from 'react-addons-shallow-compare'
const {remote} = require('electron')
const userData = remote.app.getPath('userData')
const ffmpeg = require('fluent-ffmpeg')

const fs = require('fs')

@Radium
export default class Editor extends Component {
  handleSubmit = event => {
    event.preventDefault()
    ffmpeg.setFfmpegPath(userData + '/ffmpeg')
    store.dispatch({type: 'DISABLE_METADATA', track: this.props.selected})
    let temp = userData + `/${this.props.selected.path.split("/").pop()}`
    ffmpeg(this.props.selected.path)
    .outputOptions(
      "-metadata", `artist=${this.props.selected.artist}`,
      "-metadata", `album=${this.props.selected.album}`,
      "-metadata", `title=${this.props.selected.title}`,
      "-metadata", `date=${this.props.selected.year}`,
      "-metadata", `track=${this.props.selected.track.no}`,
      "-metadata", `tracktotal=${this.props.selected.track.of}`,
      "-metadata", `disk=${this.props.selected.disk.no}`,
      "-metadata", `disctotal=${this.props.selected.disk.of}`
    )
    .save(temp)
    .on('error', (err, stdout, stderr) => {
      console.log('Cannot process metadata: ' + err.message)
      fs.unlinkSync(temp)
    })
    .on('end', (stdout, stderr) => {
      let source = fs.createReadStream(temp)
      let dest = fs.createWriteStream(this.props.selected.path)
      source.pipe(dest)
      source.on('error', function(err) {
        console.log('Cannot process metadata: ' + err.message)
        fs.unlinkSync(temp)
      })
      source.on('end', () => {
        fs.unlinkSync(temp)
        store.dispatch({type: 'UPDATE_METADATA', track: this.props.selected, albums: this.props.library.albums, tracks: this.props.library.tracks})
        this.props.reset()
      })
    })
  }
  shouldComponentUpdate = (nextProps, nextState) => {
    return shallowCompare(this, nextProps, nextState)
  }
  render () {
    return (
      <figure style={[styles.base, this.props.display ? {transform: 'translateX(0)'} : {transform: 'translateX(40vw)'}]}>
        <form style={{margin: 'auto .5em', width: '100%'}} onSubmit={this.handleSubmit}>
          <Input label='title' value={this.props.selected.title || ''} onChange={this.props.onChange} />
          <Input label='album' value={this.props.selected.album || ''} onChange={this.props.onChange} />
          <Input label='artist' value={this.props.selected.artist || ''} onChange={this.props.onChange} />
          <Input label='year' value={this.props.selected.year || ''} onChange={this.props.onChange} />
          <TrackNumbers label='track' value={this.props.selected.track || ''} onChange={this.props.onTrack} />
          <TrackNumbers label='disk' value={this.props.selected.disk || ''} onChange={this.props.onDisk} />
          <Button type='submit' value='Update' disabled={this.props.disabled || !this.props.selected} />
        </form>
      </figure>
    )
  }
}

const styles = {
  base: {
    display: 'flex',
    flexWrap: 'wrap',
    position: 'fixed',
    boxSizing: 'border-box',
    backgroundColor: 'rgba(92, 67, 232, .8)',
    top: '0vh',
    overflow: 'auto',
    right: 0,
    transition: 'transform 1s',
    width: '40vw',
    height: '100vh',
    padding: '1em',
    margin: 0,
    zIndex: 50
  }
}
