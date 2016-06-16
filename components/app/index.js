import dom4 from 'dom4'
import domready from 'domready'
import Destroyer from '../destroyer'
import Admin from '../admin'
import S3 from '../s3'
import Library from '../library'
import Feature from '../feature'
import Playbar from '../playbar'
import Showcase from '../showcase'
import Loading from '../loading'
import MainMenu from '../menu'

domready(() => {
  const destroyer = new Destroyer({
    admin: new Admin({
      connect: (key, secret, bucket) => {
        destroyer.stop()
        destroyer.feature.clearMeta()
        destroyer.s3.connect(key, secret, bucket)
      }
    }),
    s3: new S3({
      populateLibrary: (tracks, covers) => {
        destroyer.library.add(tracks, covers)
        destroyer.loading.hide()
        destroyer.feature.show()
      },
      loading: (message, error) => {
        destroyer.loading.show(message, error)
        if (error) destroyer.admin.show()
      },
      connected: () => {
        destroyer.loading.hide()
        destroyer.admin.hide()
      }
    }),
    library: new Library({
      showcase: (album, cover, tracks) => {
        destroyer.showcase.display(album, cover, tracks)
      },
      getCover: (cover) => {
        return destroyer.s3.getCover(cover)
      },
      uploadCover: (file, album) => {
        destroyer.s3.uploadFiles(file, album)
        destroyer.library.covers.push(album + '/cover.jpg')
      }
    }),
    feature: new Feature(),
    playbar: new Playbar({
      toggle: () => {
        destroyer.toggle()
      },
      playPrevious: () => {
        destroyer.previous()
      },
      playNext: () => {
        destroyer.next()
      },
      pause: (time) => {
        destroyer.pause(time)
      },
      unpause: (time) => {
        destroyer.unpause(time)
      }
    }),
    showcase: new Showcase({
      playAlbum: (album) => {
        destroyer.library.tracks.some((track) => {
          if (album === track.Key.split('/')[0]) {
            let index = destroyer.library.tracks.indexOf(track)
            destroyer.fresh(index)
            return true
          }
        })
      },
      playTrack: (track) => {
        let index = destroyer.library.tracks.indexOf(track)
        destroyer.fresh(index)
      }
    }),
    loading: new Loading()
  })

  const menu = new MainMenu({
    preferences: () => {
      destroyer.admin.show()
      destroyer.showcase.close()
    },
    alphabetically: () => {
      destroyer.library.sortAlphabetically()
    },
    newest: () => {
      destroyer.library.sortNewest()
    }
  })

  if (!localStorage.getItem('key') || !localStorage.getItem('secret') || !localStorage.getItem('bucket')) destroyer.admin.show()
  else destroyer.s3.connect(localStorage.getItem('key'), localStorage.getItem('secret'), localStorage.getItem('bucket'))
})
