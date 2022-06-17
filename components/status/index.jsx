const Status = props => (
  <figure
    style={[styles.status, props.status.display ? styles.show : styles.hide]}
  >
    <div>
      <h1 style={styles.h1}>{props.status.artist}</h1>
      <h2 style={styles.h2}>{props.status.title}</h2>
      <h3 style={styles.h3}>{props.status.album}</h3>
      <h4 style={styles.h4}>- 00:00:00</h4>
    </div>
  </figure>
)

export default Status

const styles = {
  status: {
    display: 'flex',
    width: '100vw',
    height: 'auto',
    WebkitUserSelect: 'none',
    padding: '1em 0',
    margin: 0,
    position: 'fixed',
    transition: '.5s',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
    backgroundImage:
      'linear-gradient( to bottom, rgba(33, 33, 33, .9), rgba(33, 33, 33, 0))',
    top: 0,
    left: 0,
    textAlign: 'center',
    overflow: 'hidden',
    zIndex: 10,
    flexWrap: 'wrap'
  },
  h1: {
    fontSize: '3em',
    margin: '0 0 0px',
    lineHeight: '1em',
    fontWeight: 200,
    padding: 0,
    flex: '1 1 100vw'
  },
  h2: {
    fontSize: '2.5em',
    margin: 0,
    lineHeight: '1em',
    fontWeight: 200,
    padding: 0,
    flex: '1 1 100vw'
  },
  h3: {
    fontSize: '2em',
    margin: '0 0 -0.125em',
    lineHeight: '1.25em',
    fontWeight: 200,
    padding: 0,
    flex: '1 1 100vw'
  },
  h4: {
    fontSize: '2em',
    margin: '0 0 -0.125em',
    lineHeight: '1.25em',
    fontWeight: 200,
    padding: 0,
    flex: '1 1 100vw'
  },
  show: {
    opacity: 1,
    transform: 'translateY(0em)'
  },
  hide: {
    opacity: 0,
    transform: 'translateY(-3em)'
  }
}
