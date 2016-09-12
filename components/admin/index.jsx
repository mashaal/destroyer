import React, { Component } from 'react'
import { store } from '../../client.js'
import Local from '../connection/local.js'
import Radium from 'radium'

@Radium
export default class Admin extends Component {
  componentDidMount () {
    this.local = new Local()
    if (localStorage.getItem('active') === 'local') this.local.scan(localStorage.getItem('local'))
    else store.dispatch({type: 'ADMIN'})
  }
  handleDragEnter = event => {
    this.setState({dragging: true})
  }

  handleDragOver = event => {
    event.preventDefault()
  }

  handleDragLeave = event => {
    this.setState({dragging: false})
  }

  handleDrop = event => {
    event.preventDefault()
    this.setState({dragging: false})
    if (event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0]
      this.local.scan(file.path)
      store.dispatch({type: 'DROP'})
    }
  }
  render () {
    return (
      <figure style={[styles.drop, this.props.admin.display ? styles.show : styles.hide]} onDragEnter={this.handleDragEnter} onDragOver={this.handleDragOver} onDragLeave={this.handleDragLeave} onDrop={this.handleDrop}>
        <span style={styles.span}>Drop music collection here</span>
      </figure>
    )
  }
}

const styles = {
  drop: {
    display: 'flex',
    position: 'fixed',
    boxSizing: 'border-box',
    backgroundColor: 'rgba(92, 67, 232, .8)',
    top: '0vh',
    left: '0vw',
    width: '100vw',
    height: '100vh',
    padding: 0,
    margin: 0,
    zIndex: 2000,
    transition: '.25s'
  },
  span: {
    margin: 'auto',
    fontSize: '2em',
    borderBottom: '2px solid white'
  },
  show: {
    pointerEvents: 'auto',
    opacity: 1
  },
  hide: {
    pointerEvents: 'none',
    opacity: 0
  }
}
