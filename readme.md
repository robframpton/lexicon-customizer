# Lexicon Customizer

> A desktop app for customizing Lexicon look and feel that integrates with Liferay themes

![alt text](https://github.com/robert-frampton/lexicon-customizer/raw/resources/resources/screenshot.png "Lexicon Customizer")

## Download
To download, just go to the [Releases](https://github.com/robert-frampton/lexicon-customizer/releases) tab and download the latest release.

## Running from source

### Install dependencies

```
$ npm install

$ gulp init
```

### Run

```
$ npm start
```
Or with `redux-devtools`.

```
$ npm run dev
```

### Build an `electron` release

```
$ npm run release
```

Builds the app for OS X, Linux, and Windows, using [electron-packager](https://github.com/maxogden/electron-packager).

> Note: due to the use of native modules (such as node-sass), releases must be built in their native environment.

## License

MIT © [Robert-Frampton](https://github.com/Robert-Frampton)
