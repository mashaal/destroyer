import 'aws-sdk/dist/aws-sdk'

const AWS = window.AWS

export default class S3 {
  constructor (options) {
    this.loading = options.loading
    this.connected = options.connected
    this.populateLibrary = options.populateLibrary
    this.clear()
  }
  clear () {
    this.tracks = []
    this.covers = []
  }
  uploadFiles (blob, album) {
    this.connection.upload({Bucket: this.bucket, Key: album + '/cover.jpg',  Body: blob}, function (err, data) {})
  }
  getFiles (bucket, marker) {
    this.loading('connecting to s3')
    if (!marker) marker = ''
    this.request = this.connection.listObjects({
      Bucket: bucket,
      Marker: marker
    })
    this.request.send((error, data) => {
      if (error) this.loading(error, true)
      else this.connected()
      data.Contents.forEach((file) => {
        if (['flac', 'm4a', 'mp3', 'mp4', 'aac'].indexOf(file.Key.split('.').pop()) > -1) this.tracks.push(file.Key)
        if (file.Key.split('/').pop() === 'cover.jpg') this.covers.push(file.Key)
      })
      if (data.Contents.length >= 1000) this.getFiles(bucket, this.tracks[this.tracks.length - 1])
      else this.populateLibrary(this.tracks, this.covers)
    })
  }
  connect (key, secret, bucket) {
    this.clear()
    this.bucket = bucket
    this.connection = new AWS.S3({
      accessKeyId: key,
      secretAccessKey: secret
    })
    this.getFiles(bucket)
  }
  getCover (cover) {
    return this.connection.getSignedUrl('getObject', {Bucket: this.bucket, Key: this.covers[cover]})
  }
}
