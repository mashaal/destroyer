import React, { Component } from 'react'
import { store } from '../../client.js'
import Local from '../connection/local.js'

export default class Admin extends Component {
  constructor() {
    super()
    this.state = {
      dragging: false,
      mouse: true
    }
  }
  componentDidMount() {
    this.local = new Local()
    if (localStorage.getItem('fileList'))
      this.local.collection(JSON.parse(localStorage.getItem('fileList')))
    else store.dispatch({ type: 'ADMIN' })
    window.addEventListener('dragenter', () => {
      store.dispatch({ type: 'ADMIN' })
    })
    window.addEventListener('dragleave', () => {
      store.dispatch({ type: 'DROP' })
    })
  }
  handleDragEnter = event => {
    this.setState({ dragging: true })
  }
  handleMouseOver = event => {
    this.setState({ mouse: true })
  }
  handleDragOver = event => {
    event.preventDefault()
  }
  handleMouseOut = event => {
    this.setState({ mouse: false })
  }
  handleDragLeave = event => {
    this.setState({ dragging: false })
  }
  handleDrop = event => {
    event.preventDefault()
    this.setState({ dragging: false })
    if (event.dataTransfer.files.length > 0) {
      this.local.collection(event.dataTransfer.files)
      store.dispatch({ type: 'DROP' })
    }
  }
  render() {
    return (
      <figure
        style={[
          styles.drop,
          this.props.admin.display || this.state.dragging
            ? styles.show
            : styles.hide
        ]}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
        onDragEnter={this.handleDragEnter}
        onDragOver={this.handleDragOver}
        onDragLeave={this.handleDragLeave}
        onDrop={this.handleDrop}
      >
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
    zIndex: 40,
    transition: '.25s'
  },
  span: {
    margin: 'auto',
    fontSize: '2em',
    borderBottom: '2px solid white',
    pointerEvents: 'none'
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
