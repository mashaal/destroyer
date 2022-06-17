const Bar = () => <nav css={styles.base} />

export default Bar

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
