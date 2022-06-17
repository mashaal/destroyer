const Button = props => (
  <button
    style={[styles.base, props.disabled && styles.disabled]}
    type={props.type}
    onClick={props.callback}
    disabled={props.disabled}
  >
    {props.value}
  </button>
)

const styles = {
  base: {
    appearance: 'none',
    boxSizing: 'border-box',
    border: 'none',
    outline: 'none',
    color: 'rgba(92, 67, 232, .8)',
    display: 'block',
    cursor: 'pointer',
    width: 'calc(100% - 1em)',
    padding: '1em 1em',
    margin: 'auto',
    borderRadius: '.2em',
    boxShadow: '.2em .2em 0px rgba(0, 0, 0, .1)',
    fontSize: '100%',
    textTransform: 'uppercase',
    fontWeight: 600,
    letterSpacing: '.1em',
    background: 'white',
    transition: 'background .25s, color .25s',
    ':hover': {
      background: 'rgba(255, 255, 255, 0.8)'
    }
  },
  disabled: {
    cursor: 'not-allowed',
    opacity: '.5'
  }
}

export default Button
