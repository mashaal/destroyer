import React, { Component } from 'react'
import key from 'key'
import Radium from 'radium'
import shallowCompare from 'react-addons-shallow-compare'
import CloseButton from '../close-button'
import { store } from '../../client.js'

@Radium
export default class Search extends Component {
  constructor () {
    super()
    this.state = {
      search: ''
    }
    this.handleSearch = this.handleSearch.bind(this)
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
  }
  handleSearch (event) {
    event.preventDefault()
    store.dispatch({type: 'SEARCH', input: event.target.value})
  }
  render () {
    return (
      <form style={[styles.search, this.props.search.display ? styles.show : styles.hide]}>
        <CloseButton />
        <input ref='search' type='text' value={this.props.search.input} style={styles.input} onChange={this.handleSearch} />
      </form>
    )
  }
}

const styles = {
  search: {
    display: 'block',
    transition: '.25s',
    zIndex: 30,
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
    fontFamily: 'AveriaSerif-Light',
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
    transform: 'translateY(-5em)'
  }
}
