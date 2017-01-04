import React from 'react'
import Radium from 'radium'
import { store } from '../../client.js'

const CloseButton = props =>
  <div style={styles.base} onClick={() => {
    store.dispatch({type: 'ESCAPE'})
    if (props.onClick) props.onClick()
  }}>×</div>

export default Radium(CloseButton)

const styles = {
  base: {
    width: '1em',
    height: '1em',
    fontSize: '300%',
    position: 'fixed',
    fontWeight: '200',
    top: '.25em',
    cursor: 'pointer',
    right: '.25em',
    zIndex: 80,
    color: 'white',
    transition: '.5s',
    ':hover': {
      color: 'red'
    }
  }
}
