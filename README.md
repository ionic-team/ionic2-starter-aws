This is a starter template for [Ionic 2](http://ionicframework.com/docs/v2/) projects.

## How to use this template

*This template does not work on its own*. The shared files for each starter are found in the [ionic2-app-base repo](https://github.com/driftyco/ionic2-app-base).

To use this template, either create a new ionic project using the ionic node.js utility, or copy the files from this repository into the [Starter App Base](https://github.com/driftyco/ionic2-app-base).

### With the Ionic CLI:

Take the name after `ionic2-starter-`, and that is the name of the template to be used when using the `ionic start` command below:

```bash
$ sudo npm install -g ionic cordova
$ ionic start awsMobile aws --v2
```

Then, to run it, cd into `myBlank` and run:

```bash
$ ionic platform add ios
$ ionic run ios
```

Substitute ios for android if not on a Mac.

### Additional Dependencies

```bash
$ npm install --save aws-sdk
$ npm install --save aws-sdk-mobile-analytics
$ npm install --save amazon-cognito-identity-js
$ npm install --save @types/node
```

### Configuration

This starter allows you to setup multiple configurations (e.g. development vs production). The config that is loaded is determined by the file you choose to import into the `src/app/app.env.ts` file.

Configs live within the `src/app/config` directory. The development configuration is loaded by default.
