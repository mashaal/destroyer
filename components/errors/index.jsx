import React from 'react'
import Radium, { keyframes } from 'radium'

const Errors = props =>
  <div>
    <div style={[styles.base, props.errors.meta <= 0 && {display: 'none'}]}>
      <div style={styles.icon}>!</div>
      <div style={{padding: '0 1em', display: 'flex', alignItems: 'center'}}>There {props.errors.meta > 1 ? 'are' : 'is'} <span style={{fontSize: '150%', display: 'inline-block', margin: '0 .25em'}}>{props.errors.meta}</span> {props.errors.meta > 1 ? 'tracks' : 'track'} with missing or incomplete metadata. Please fix.</div>
    </div>
    <div style={[styles.base, props.errors.art <= 0 && {display: 'none'}]}>
      <div style={styles.mark}>?</div>
      <div style={{padding: '0 1em', display: 'flex', alignItems: 'center'}}>There {props.errors.art > 1 ? 'are' : 'is'} <span style={{fontSize: '150%', display: 'inline-block', margin: '0 .25em'}}>{props.errors.art}</span> {props.errors.art > 1 ? 'albums' : 'album'} with missing artwork.</div>
    </div>
  </div>

export default Radium(Errors)

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
    padding: '1em 2em',
    background: 'rgba(92, 67, 232, .8)',
    marginBottom: '1em',
    fontWeight: 800,
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    color: 'red',
    fontSize: '400%',
    lineHeight: '1em',
    width: '1em',
    textAlign: 'center',
    transformOrigin: '50% 50%',
    animation: 'x .33s infinite alternate ease-in-out',
    animationName: rotateKeyframes
  },
  mark: {
    color: 'white',
    fontSize: '400%',
    lineHeight: '1em',
    width: '1em',
    textAlign: 'center',
    transformOrigin: '50% 50%',
    animation: 'x .33s infinite alternate ease-in-out',
    animationName: rotateKeyframes
  }
}
