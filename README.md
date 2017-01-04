<img src='http://destroyer.audio/static/destroyer.png' width='250px'/>

# Destroyer
### Open-Source Lossless Audio Player

![destroyer](http://destroyer.audio/static/destroyer.jpg)

* Lossless playback (supports FLAC and ALAC - in addition to AAC, MP3, MP4)
* Metadata editor
* Modern UI with focus on album artwork
* Open-Source and built with web technologies

[Download for Mac](https://github.com/mashaal/destroyer/releases)

[Watch demo video on YouTube](https://www.youtube.com/watch?v=xqZwJ7lf9h8&feature=youtu.be)

## Getting Started:

![start](http://destroyer.audio/static/start.gif)

* Download and open **Destroyer**.
* Drop your music collection onto **Destroyer**.
* **Destroyer** will recursively scan your collection and build library based on metadata.

**Note:** **Destroyer** is dependant on metadata — it can process [Vorbis](https://wiki.xiph.org/Metadata) comments as well as [ID3](https://en.wikipedia.org/wiki/ID3) (1.1, 2.2, 2.3, 2.4) tags. Please ensure your collection is properly formatted.

## On Metadata:

![metadata](http://destroyer.audio/static/metadata.gif)

> `Menu > Destroyer > Edit Metadata...` or `cmd-m`

* On import, **Destroyer** will analyze your collection for incomplete/missing metadata.
* You can view/edit metadata in the metadata view `cmd-m`

**Protip:** While playing a track, toggling the metadata view will take you directly to the currently playing album.

## On Artwork:

![artwork](http://destroyer.audio/static/artwork.gif)

* **Destroyer** works best when all the tracks for an album are in one flat directory.
* **Destroyer** will look for a file named `cover.jpg` in the album's directory.
* You can drag and drop new artwork in the metadata view.

## On Search:

![search](http://destroyer.audio/static/search.gif)

* Type anywhere in the library view to filter your collection.
* `esc` will clear your filter.

### Deving and Building

| Command               | Purpose                                         |
|:----------------------|:------------------------------------------------|
| `npm run clean`       | Delete `/bundle`.                               |
| `npm run build`       | Compile JS `/bundle`.                           |
| `npm run build:watch` | Build project and watch for changes.            |
| `npm start`           | Start Destroyer.                                |
| `npm run pack:osx`    | Build for Mac.                                  |
