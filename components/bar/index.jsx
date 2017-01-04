import React from 'react'
import Radium from 'radium'

const Bar = () =>
  <nav style={styles.base} />

export default Radium(Bar)

const styles = {
  base: {
    width: '100vw',
    height: '1.5em',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 100,
    WebkitAppRegion: 'drag',
    transition: '.5s',
    ':hover': {
      backgroundColor: 'rgba(92, 67, 232, .8)'
    }
  }
}
