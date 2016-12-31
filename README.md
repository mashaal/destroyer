![image](https://dl.dropboxusercontent.com/u/49075567/destroyer-logo.png)

# Destroyer

> Open-Source Lossless Audio Player

![image](https://dl.dropboxusercontent.com/u/49075567/destroyer.png)

* Lossless playback (supports FLAC, ALAC, AAC, MP3, MP4).
* Minimalist design with focus on album artwork.
* Open-source.

[View Demo Video on YouTube](https://www.youtube.com/watch?v=xqZwJ7lf9h8&feature=youtu.be)

[Download latest version of destroyer](https://github.com/mashaal/destroyer/releases)

## Getting Started

* Download and open Destroyer.
* Drop your music collection onto Destroyer.
* Destroyer will recursively scan your collection and build library based on metadata.

## Directory Structure

* Destroyer works best when each album is contained in it's own directory.
* Destroyer looks for a file named `cover.jpg` in each album directory.


```
/album
/album/track-01
/album/track-02
/album/cover.jpg

/another-album
/another-album/track-01
/another-album/track-02
/another-album/cover.jpg

```

## Protips

* Type anywhere in the library view to search!
* Having clean and consistent metadata will ensure best experience.

## Currently Known Issues

[https://github.com/mashaal/destroyer/issues](https://github.com/mashaal/destroyer/issues)


### Deving and Building

| Command               | Purpose                                         |
|:----------------------|:------------------------------------------------|
| `npm run lint:js`     | Lint JS (see `eslintConfig` in `package.json`). |
| `npm run lint:js:fix` | Lint JS and automatically fix issues.           |
| `npm run clean`       | Delete `/bundle`.                               |
| `npm run build`       | Compile JS `/bundle`.                           |
| `npm run build:watch` | Build project and watch for changes.            |
| `npm start`           | Start Destroyer.                                |
| `npm run pack:osx`    | Build for Mac.                                  |
| `npm run pack:windows`| Build for Windows.                              |
| `npm run pack:linux`  | Build for Linux.                                |

## Future?

* Code cleanup & documentation.
* Seeking functionality in Playbar.

## Help?

* Currently seeking help testing and debugging Windows and Linux platforms!
