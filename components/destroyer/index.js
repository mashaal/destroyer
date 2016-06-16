export default class Destroyer {
  constructor (options) {
    this.admin = options.admin
    this.s3 = options.s3
    this.library = options.library
    this.feature = options.feature
    this.playbar = options.playbar
    this.showcase = options.showcase
    this.loading = options.loading
    this.current = 0
    this.ch1 = false
    this.ch2 = false
    this.active = true
  }
  fresh (index) {
    this.active = true
    this.current = index
    if (this.ch1.playing) this.ch1.stop()
    if (this.ch2.playing) this.ch2.stop()
    this.loading.show(this.library.tracks[index].Key)
    this.feature.hide()
    this.playbar.hide()
    this.s3.connection.headObject({Bucket: this.s3.bucket, Key: this.library.tracks[index].Key}, (error, data) => {
      if (error) this.loading.show(error, true)
      else {
        let length = data.ContentLength
        this.ch1 = AV.Player.fromURL(this.s3.connection.getSignedUrl('getObject', {Bucket: this.s3.bucket, Key: this.library.tracks[index].Key}), length)
        this.ch1.preload()
        this.s3.connection.headObject({Bucket: this.s3.bucket, Key: this.library.tracks[Number(index) + 1].Key}, (error, data) => {
          if (error) this.loading.show(error, true)
          else {
            let length = data.ContentLength
            this.ch2 = AV.Player.fromURL(this.s3.connection.getSignedUrl('getObject', {Bucket: this.s3.bucket, Key: this.library.tracks[Number(index) + 1].Key}), length)
            this.play(this.ch1, this.ch2, index)
          }
        })
      }
    })
  }
  gapless (active, next, index) {
    this.current = index
    this.active = !this.active
    if (!this.active) {
      this.s3.connection.headObject({Bucket: this.s3.bucket, Key: this.library.tracks[Number(index) + 1].Key}, (error, data) => {
        if (error) this.loading.show(error, true)
        else {
          let length = data.ContentLength
          this.ch1 = AV.Player.fromURL(this.s3.connection.getSignedUrl('getObject', {Bucket: this.s3.bucket, Key: this.library.tracks[Number(index) + 1].Key}), length)
          this.play(this.ch2, this.ch1, index)
        }
      })
    } else {
      this.s3.connection.headObject({Bucket: this.s3.bucket, Key: this.library.tracks[Number(index) + 1].Key}, (error, data) => {
        if (error) this.loading.show(error, true)
        else {
          let length = data.ContentLength
          this.ch2 = AV.Player.fromURL(this.s3.connection.getSignedUrl('getObject', {Bucket: this.s3.bucket, Key: this.library.tracks[Number(index) + 1].Key}), length)
          this.play(this.ch1, this.ch1, index)
        }
      })
    }
  }
  error (error, active) {
    this.loading.show(error, true)
    active.asset.decoder = {}
    active.asset.demuxer = {}
  }
  toggle () {
    if (this.active) {
      if (this.ch1.playing) {
        this.ch1.pause()
        this.playbar.set('play')
      } else {
        this.ch1.play()
        this.playbar.set('pause')
      }
    } else {
      if (this.ch2.playing) {
        this.ch2.pause()
        this.playbar.set('play')
      } else {
        this.ch2.play()
        this.playbar.set('pause')
      }
    }
  }
  pause (time) {
    if (this.active) {
      if (this.ch1.playing) {
        this.ch1.pause()
      }
    } else {
      if (this.ch2.playing) {
        this.ch2.pause()
      }
    }
  }
  unpause (time) {
    if (this.active) {
      this.ch1.seek(time)
      this.ch1.play()
    } else {
      this.ch2.seek(time)
      this.ch2.play()
    }
  }
  stop () {
    if (this.ch1.playing) this.ch1.stop()
    if (this.ch2.playing) this.ch2.stop()
    this.playbar.hide()
  }
  play (active, next, index) {
    active.play()
    this.playbar.set('pause')
    if (active.asset.buffered && active.asset.metadata) {
      this.playbar.setBuffer(100)
      this.loading.hide()
      this.feature.show()
      this.playbar.show()
      this.feature.setMeta(active.asset.metadata.artist, active.asset.metadata.title, active.asset.metadata.album)
      active.on('progress', (progress) => {
        this.feature.setRemaining(Math.floor((active.asset.duration - progress) / 1000))
        this.playbar.setRemaining(active.asset.duration, progress)
      })
      next.preload()
    } else {
      active.on('duration', (duration) => {
        active.on('progress', (progress) => {
          this.feature.setRemaining(Math.floor((duration - progress) / 1000))
          this.playbar.setRemaining(duration, progress)
        })
      })
      active.on('buffer', (buffer) => {
        this.playbar.setBuffer(buffer)
        if (buffer === 100) {
          next.preload()
        }
      })
      active.on('metadata', (metadata) => {
        this.loading.hide()
        this.feature.show()
        this.playbar.show()
        this.feature.setMeta(metadata.artist, metadata.title, metadata.album)
      })
    }
    active.on('error', (error) => {
      this.error(error, active)
    })
    active.on('end', () => {
      this.gapless(next, active, Number(index) + 1)
    })
  }
  previous () {
    this.fresh(this.current - 1)
  }
  next () {
    this.fresh(this.current + 1)
  }
}
