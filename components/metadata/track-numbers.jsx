import React from 'react'
import Radium from 'radium'

const TrackNumbers = props =>
  <div style={styles.base}>
    <div style={{padding: '0 .5em'}}>
      <label style={[styles.label, {textTransform: 'capitalize'}]}>{props.label === 'disk' ? 'disc' : props.label}</label>
      <input type={props.type || 'text'} data-label='no' style={styles.input} required={props.required} value={props.value ? props.value.no : ''} onChange={props.onChange} />
    </div>
    <div style={{padding: '0 .5em'}}>
      <label style={styles.label}>of</label>
      <input type={props.type || 'text'} data-label='of' style={styles.input} required={props.required} value={props.value ? props.value.of : ''} onChange={props.onChange} />
    </div>
  </div>

export default Radium(TrackNumbers)

const styles = {
  base: {
    display: 'flex',
    boxSizing: 'border-box',
    flex: '1 1 100%',
    width: '100%'
  },
  label: {
    textAlign: 'left',
    display: 'block',
    margin: '0em auto .5em',
    fontSize: '90%'
  },
  input: {
    display: 'block',
    width: '100%',
    appearance: 'none',
    border: 'none',
    boxSizing: 'border-box',
    boxShadow: 'none',
    outline: 'none',
    fontFamily: 'AveriaSerif-Light',
    padding: '.5em',
    fontSize: '1.5em',
    marginBottom: '1em',
    transition: 'border .666s',
    color: 'white',
    background: 'rgba(92, 67, 232, .8)'
  }
}
