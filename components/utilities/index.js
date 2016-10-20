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
