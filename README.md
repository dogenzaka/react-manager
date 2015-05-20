# React Manager

Management console for any services inspired by ng-manager.  
You can use react manager to your services only with implementing simple REST API.

## Quick start

You can check http://dogenzaka.github.io/react-manager/ with your browser.

## Browser Compatiblity

- Chrome

## REST API

See [Wiki](https://github.com/dogenzaka/react-manager/wiki/rest-api)


## Development

To install dependencies,

```
npm install
```

To build and run example server,

```
gulp
```

<br/>
As Desktop Application
----
Desktop app is created by [Electron](https://github.com/atom/electron).
<br/>
#### Run as Electron App
for `electron` command.
```shell
npm install electron-prebuilt -g
```

run example server on `http://localhost:4000`
```shell
gulp server
```
run react-manager as Electron App
```shell
electron .
```
register endpoint `http://localhost:4000`  

<br/>
#### Packaging and Distribute
for all platform (mac, win32, win64)
```shell
gulp electron
```
for specific platform
```
gulp build
gulp electron_mac
gulp electron_win32
gulp electron_win64
```
`app_mac.zip` `app_win32.zip` `app_win64.zip` are created in root directory.  
you can unzip and execute the application.
```
unzip app_mac.zip -d app_mac
// ...logs
// created react-manager.app

// Let's run!
cd app_mac
open -a react-manager.app
// shutdown is cmd+Q
```
