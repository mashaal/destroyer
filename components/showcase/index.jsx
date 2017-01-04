import React, { Component } from 'react'
import Radium, { keyframes } from 'radium'
import { store } from '../../client.js'
import shallowCompare from 'react-addons-shallow-compare'
import Track from './track.jsx'
import close from './close.png'
import play from './play.png'

@Radium
export default class Showcase extends Component {
  shouldComponentUpdate = (nextProps, nextState) => {
    return shallowCompare(this, nextProps, nextState)
  }
  handleClick = event => {
    if (event.target.tagName === 'ARTICLE') window.player.playAlbum(this.props.showcase.album)
    else store.dispatch({type: 'CLOSE_SHOWCASE'})
  }
  render () {
    let cover = {backgroundImage: `url(../../library/default.jpg)`}
    if (this.props.showcase.album.cover) cover = {backgroundImage: 'url("' + this.props.showcase.album.cover + '")'}
    return (
      <section style={[styles.showcase, this.props.showcase.display ? styles.show : styles.hide]}>
        <figure style={[styles.figure, this.props.showcase.display ? styles.top : styles.bottom]} onClick={this.handleClick}>
          <article style={[styles.article, cover]} />
        </figure>
        <ol style={[styles.ol, this.props.showcase.display ? styles.slide : '']}>
          {this.props.showcase.tracks.map((track, index) => {
            if ((this.props.showcase.album.title === track.album) && (this.props.showcase.album.artist === track.artist)) return (<Track track={track} key={index} player={this.props.player} />)
          })}
        </ol>
      </section>
    )
  }
}

const rotateKeyframes = keyframes({
  from: {
    transform: 'rotateY(-20deg)'
  },
  to: {
    transform: 'rotateY(20deg)'
  }
})

const styles = {
  showcase: {
    display: 'block',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 5,
    transform: 'translate3d(0, 0, 0)',
    transition: 'opacity .666s',
    background: 'rgba(33, 33, 33, .8)'
  },
  figure: {
    width: '100vw',
    transition: 'transform 1s',
    cursor: 'url(' + close + ') 32 32, alias',
    perspective: '100vw',
    position: 'absolute',
    margin: 0,
    padding: 0,
    top: 0,
    transformStyle: 'preserve-3d',
    height: '100vh'
  },
  bottom: {
    transform: 'translateY(12.5vh)'
  },
  top: {
    transform: 'translateY(0)'
  },
  article: {
    margin: '17vh auto',
    width: '66vh',
    backfaceVisibility: 'hidden',
    backgroundSize: 'cover',
    backgroundColor: 'rgba(33, 33, 33, 1)',
    backgroundPosition: 'center center',
    height: '66vh',
    cursor: 'url(' + play + ') 32 32, pointer',
    perspective: 500,
    animation: 'x 5s infinite alternate ease-in-out',
    animationName: rotateKeyframes
  },
  ol: {
    position: 'fixed',
    bottom: 0,
    overflow: 'auto',
    listStyle: 'none',
    width: '100vw',
    height: 'calc(50vh - 100px)',
    margin: 0,
    padding: '0 0 100px',
    transitionDuration: '1s',
    transitionDelay: '.5s',
    background: 'rgba(33, 33, 33, .75)',
    opacity: 0,
    transform: 'translateY(12.5vh)'
  },
  slide: {
    opacity: 1,
    transform: 'translateY(0)'
  },
  show: {
    opacity: 1,
    pointerEvents: 'auto'
  },
  hide: {
    opacity: 0,
    pointerEvents: 'none'
  }
}
