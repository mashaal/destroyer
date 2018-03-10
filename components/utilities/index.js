/**
 * Throttles a function using window.requestAnimationFrame.
 * @see https://github.com/wuct/raf-throttle
 * @param {function} callback - Callback to run no more than once per animation frame.
 * @returns {function} A throttled callback function suitable for a listener.
 */
export const rafThrottle = callback => {
  let requestId
  const later = args => () => {
    requestId = null
    callback(...args)
  }
  const throttled = (...args) => {
    if (requestId == null) requestId = window.requestAnimationFrame(later(args))
  }
  throttled.cancel = () => window.cancelAnimationFrame(requestId)
  return throttled
}

export const sortTracks = tracks => {
  tracks.sort((a, b) => {
    if (a.artist < b.artist) return -1
    if (a.artist > b.artist) return 1
    if (a.album > b.album) return 1
    if (a.album < b.album) return -1
    if (a.track.no > b.track.no) return 1
    if (a.track.no < b.track.no) return -1
    return 0
  })
  return tracks
}

export const sortAlbums = albums => {
  albums.sort((a, b) => {
    if (a.artist < b.artist) return -1
    if (a.artist > b.artist) return 1
    if (a.title > b.title) return 1
    if (a.title < b.title) return -1
    return 0
  })
  return albums
}
