![image](https://dl.dropboxusercontent.com/u/49075567/destroyer-logo.png)

# Destroyer

> Open-Source Lossless Music Player

![image](https://dl.dropboxusercontent.com/u/49075567/destroyer.png)

* Lossless playback (supports FLAC, ALAC, AAC, MP3, MP4).
* Minimalist design with focus on album artwork.
* Open-source.

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


### Semi-working build instruction for Ubuntu.
The following will launch the application window but no songs will appear.  
If you don't have already, install `aptitude` using `sudo apt-get install aptitude`.  
1) `sudo aptitude install npm nodejs nodejs-legacy`. Without `nodejs-legacy` the install of Electron seems to  fail.  
2) `npm install electron -g` for a global install of [Electron](https://github.com/electron/electron).  
3) Clone the latest version of [Destroyer](http://destroyer.audio/) from `git@github.com:mashaal/destroyer.git`.  
4) Enter the cloned repository using `cd destroyer`.  
5) Install the needed dependency [electron-window-state](https://github.com/mawie81/electron-window-state) by issuing the command `npm install --save electron-window-state` while you are in the cloned Destroyer directory.  
6) Launch `Destroyer` by typing `electron index.js` while you are inside the cloned Destroyer directory.  


Currently a black window with a functional meny will appear. If you use the menu to activate the developer tools the error "Failed to load resource: net::ERR_FILE_NOT_FOUND" for the file
`destroyer/bundle/destroyer.js`

If you drag a directory containing a correctly lanmed .flac-file you may get the error: ``Failed to clear temp storage: It was determined that certain files are unsafe for access within a Web application, or that too many calls are being made on file resources. SecurityError`` or an error stating there is no permission to access the file.

## Future?

* Builds for Windows and Linux.
* Code cleanup & documenation.
* Seeking functionality in Playbar.
