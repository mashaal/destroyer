<img src='https://www.dropbox.com/s/alcqju8k9lkr3b9/destroyer-logo.png?raw=1' width='250px'/>

# Destroyer
### Open-Source Lossless Audio Player

![destroyer](http://destroyer.audio/static/destroyer.jpg)

### v2.0 Breaking Changes:

* Swap to native HTML5 audio players (FLAC, MP4, MP3, OGG, WAV supported!)
* Seeking (finally!)
* TouchBar support for Macbook Pro!
* An actual DMG install file for Mac (wow!)
* Removal of FFPLAY and FFMEG (this should make it easier to build for all OS!)
* Removal of metadata editor (may come back!)
* Minor style tweeks

[Download for Mac](https://github.com/mashaal/destroyer/releases)

[Watch demo video on YouTube](https://www.youtube.com/watch?v=xqZwJ7lf9h8&feature=youtu.be)

## Getting Started:

![start](http://destroyer.audio/static/start.gif)

* Download and open **Destroyer**.
* Drop your music collection onto **Destroyer**.
* **Destroyer** will recursively scan your collection and build library based on metadata.

**Note:** **Destroyer** is dependant on metadata — it can process [Vorbis](https://wiki.xiph.org/Metadata) comments as well as [ID3](https://en.wikipedia.org/wiki/ID3) (1.1, 2.2, 2.3, 2.4) tags. Please ensure your collection is properly formatted.

## On Artwork:

* **Destroyer** works best when all the tracks for an album are in one flat directory.
* **Destroyer** will look for a file named `cover.jpg` in the album's directory.

## On Search:

![search](http://destroyer.audio/static/search.gif)

* Type anywhere in the library view to filter your collection.
* `esc` will clear your filter.

### Deving and Building

| Command                | Purpose                                         |
|:-----------------------|:------------------------------------------------|
| `yarn run build`       | Compile JS `/bundle`.                           |
| `yarn run build:watch` | Build project and watch for changes.            |
| `yarn start`           | Start Destroyer.                                |
| `yarn run pack:osx`    | Build for Mac.                                  |
| `yarn run pack:win`    | Build for Windows.                              |
