import React from 'react'

const Input = props => (
  <div style={styles.base}>
    <div style={{ padding: '0 .5em' }}>
      {props.label && <label style={styles.label}>{props.label}</label>}
      <input
        type={props.type || 'text'}
        style={styles.input}
        required={props.required}
        value={props.value}
        onChange={props.onChange}
        data-label={props.label}
      />
    </div>
  </div>
)

export default Input

const styles = {
  base: {
    margin: 'auto',
    boxSizing: 'border-box',
    flex: '1 1 100%',
    width: '100%'
  },
  label: {
    textAlign: 'left',
    display: 'block',
    margin: '1em auto .5em',
    textTransform: 'capitalize',
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
    fontSize: '150%',
    marginBottom: '1em',
    transition: 'border .666s',
    color: 'white',
    background: 'rgba(92, 67, 232, .8)'
  }
}
