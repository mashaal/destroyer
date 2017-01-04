import React, { Component } from 'react'
import key from 'key'
import Radium from 'radium'
import shallowCompare from 'react-addons-shallow-compare'
import { store } from '../../client.js'

@Radium
export default class Search extends Component {
  constructor () {
    super()
    this.clear = this.clear.bind(this)
  }
  shouldComponentUpdate = (nextProps, nextState) => {
    return shallowCompare(this, nextProps, nextState)
  }
  componentDidMount () {
    window.addEventListener('keydown', (event) => {
      if (!this.props.admin.display && !this.props.metadata.display) {
        if (key.is(key.code.alnum, event.which) || event.keyCode === 8) {
          this.refs.search.focus()
        }
      }
    })
    window.addEventListener('keyup', (event) => {
      if (!this.props.admin.display && !this.props.metadata.display) {
        if (key.is(key.code.alnum, event.which) || event.keyCode === 8) {
          let albums = this.props.search.fuzzy.search(this.refs.search.value)
          store.dispatch({type: 'SEARCH', input: this.refs.search.value, albums: albums})
        }
        if (event.keyCode === 27) {
          this.clear()
        }
      }
    })
  }
  clear = () => {
    this.refs.search.value = ''
    let albums = this.props.search.fuzzy.search('')
    store.dispatch({type: 'CLEAR', input: '', albums: albums})
  }
  render () {
    return (
      <form style={[styles.search, this.props.search.display ? styles.show : styles.hide]}>
        <input ref='search' type='text' style={styles.input}/>
        <span ref='close' onClick={this.clear} style={styles.span}></span>
      </form>
    )
  }
}

const styles = {
  search: {
    display: 'block',
    transition: '.25s',
    zIndex: 99,
    width: '100vw',
    position: 'fixed',
    textAlign: 'left'
  },
  input: {
    display: 'block',
    width: '100%',
    appearance: 'none',
    border: 'none',
    boxShadow: 'none',
    outline: 'none',
    fontFamily: '\'AveriaSerif-Light\'',
    padding: '1em',
    fontSize: '2em',
    marginBottom: '1em',
    transition: 'border .666s',
    color: 'white',
    background: 'rgba(92, 67, 232, .8)'
  },
  span: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: '1em',
    fontSize: '2em',
    cursor: 'pointer',
    color: 'white'
  },
  show: {
    opacity: 1,
    transform: 'translateY(0em)'
  },
  hide: {
    opacity: 0,
    transform: 'translateY(-3em)',
    pointerEvents: 'none'
  }
}
