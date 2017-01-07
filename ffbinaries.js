var ffbinaries = require('ffbinaries')
var platform = ffbinaries.detectPlatform()
var fs = require('fs')
var archiver = require('archiver')

ffbinaries.downloadFiles(platform, {components: ['ffmpeg', 'ffplay', 'ffprobe'], destination: './ffmpeg'}, () => {
  var output = fs.createWriteStream('ffmpeg.zip')
  var archive = archiver('zip')

  output.on('close', function () {
    console.log('ffmpeg complete')
  })

  archive.on('error', function (err) {
    throw err
  })

  archive.pipe(output)
  archive.bulk([
    {expand: true, cwd: './ffmpeg', src: ['**'], dest: './'}
  ])
  archive.finalize()
})
