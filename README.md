#destroyer (beta)

> open-source lossless streaming

![image](https://dl.dropboxusercontent.com/u/49075567/destroyer.gif)

* lossless high fidelity audio (supports flac and alac — also: mp3, aac)
* high resolution artwork
* powered by amazon s3
* no ads or sponsored content
* gapless playback
* minimalist UI

[download latest version of destroyer](https://github.com/mashaal/destroyer/releases)

there once was a time when you had total control and ownership of your music collection — destroyer seeks to bring this power back to you.

this project began from my personal dissatisfaction with other streaming services (audio quality, artwork resolution, sponsored content, unnecessary features, etc). in addition, my laptops hard drive space quickly diminished with a growing library, and lugging an external hd is not an option.

> all music featured in examples was purchased directly from artists and labels via their bandcamp accounts. [my bandcamp profile](https://bandcamp.com/ultradracula)

##setup

####1. preparing your amazon s3 bucket

currently, you need to manage your amazon s3 bucket externally to destroyer. this can be accomplished through the interface amazon provides, or with apps like [transmit](https://www.panic.com/transmit/) (recommended).

your bucket should follow this following structure. each album has it's own directory, which in turn contains all tracks. this is a similar format that most download services provide.

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
further reading: [getting started with amazon s3](https://aws.amazon.com/s3/getting-started/)

####2. adding your s3 details into destroyer

![image](https://dl.dropboxusercontent.com/u/49075567/destroyer-admin.gif)

the admin screen will present itself if no s3 details are present. to edit these in the future, navigate to `Destroyer > Preferences...`

find your `Access Key Id` and `Secret Access Key` from the amazon console. also enter the name of your bucket. these details are stored locally, and your information will never be shared.

##artwork

![image](https://dl.dropboxusercontent.com/u/49075567/destroyer-cover.gif)

destroyer looks for `cover.jpg` in each album directory. if this file is not found, no artwork will display. artwork can be added by dragging a jpg image onto the album in the library view. the file will be renamed to `cover.jpg` and uploaded to your bucket.

##pro-tips

* use `esc` to cancel out of loading and admin screens.
* use `command-R` to refresh destroyer.
* to use destroyer with 3rd party equalizers / audio filters, or to enable custom audio routing, try [audio hijack](http://www.rogueamoeba.com/audiohijack/) (recommended).

##gotchas

* cost: while s3 storage rates are quite cheap, the data transfer rates can slowly add up — please keep an eye on your usage.
* requires internet connection: there are no offline or local playback options (yet)


##wishlist

> please open an [issue](https://github.com/mashaal/destroyer/issues) if you have any thoughts on how to make a better destroyer.

* advanced sorting / filtering / searching (in progress)
* seeking (in progress)
* auto-updates
* new app icon
* better metadata integration
* playlists / queues
* offline / local playback
* integration with alternative cloud storage providers
* equalizers / audio filters
* full s3 management through destroyer

#####developed in the fires of hell by [teacups](http://teacups.io)
