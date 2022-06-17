import { Component } from 'react'
import ReactDOM from 'react-dom'
const paper = require('paper/dist/paper-full')

export default class Fuzz extends Component {
  componentDidMount() {
    paper.install(window)
    paper.setup('oscilloscope')
    this.canvas = document.getElementById('oscilloscope')
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.path = new Path()
    this.path.smooth()
    this.path.strokeColor = 'rgba(92, 67, 232, 1)'
    this.path.strokeWidth = 5

    this.context = new window.AudioContext()
    this.source = this.context.createMediaElementSource(
      document.getElementById('xxx')
    )
    this.analyser = this.context.createAnalyser()
    this.analyser.fftSize = 64
    this.bufferLength = this.analyser.frequencyBinCount
    this.dataArray = new Uint8Array(this.bufferLength)
    this.analyser.getByteTimeDomainData(this.dataArray)
    // Get a canvas defined with ID 'oscilloscope'
    this.source.connect(this.analyser)
    this.analyser.connect(this.context.destination)
    this.draw()
  }
  draw = () => {
    requestAnimationFrame(this.draw)
    if (window.throttle) return
    window.throttle = true
    setInterval(() => {
      window.throttle = false
    }, 250)
    this.path.removeSegments()
    this.analyser.getByteTimeDomainData(this.dataArray)
    this.path.add(new Point(0, this.canvas.height / 2))

    var sliceWidth = this.canvas.width * 1.0 / this.bufferLength
    var x = 0

    for (var i = 0; i < this.bufferLength; i++) {
      var v = this.dataArray[i] / 128.0
      var y = v * this.canvas.height / 2

      if (i !== 0) {
        this.path.add(new Point(x, y))
      }

      x += sliceWidth
    }

    window.view.draw()
  }
  render() {
    return (
      <canvas
        id="oscilloscope"
        height="100%"
        width="100%"
        css={{
          opacity: 0.8,
          width: '100%',
          pointerEvents: 'none',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 4
        }}
      />
    )
  }
}
