This is a starter template for [Ionic 2](http://ionicframework.com/docs/v2/) projects.

## How to use this template

*This template does not work on its own*. The shared files for each starter are found in the [ionic2-app-base repo](https://github.com/driftyco/ionic2-app-base).

To use this template, either create a new ionic project using the ionic node.js utility, or copy the files from this repository into the [Starter App Base](https://github.com/driftyco/ionic2-app-base).

### With the Ionic CLI:

Take the name after `ionic2-starter-`, and that is the name of the template to be used when using the `ionic start` command below:

```bash
$ ionic start awsMobile aws --v2
```

### Additional Dependencies

```bash
$ npm install --save aws-sdk
$ npm install --save amazon-cognito-identity-js
$ npm install --save @types/node
```

### Import project to Mobile Hub

Go to Mobile Hub and select "import project". Supply the `mobile-hub-project.zip` and name the project whatever you would like.

### Grab the configuration

Within the Content Delivery S3 bucket you will find an `aws-config.js` file. Copy the contents of this file to `app.config.ts` within the following block:

```javascript
// --- BEGIN MOBILE HUB CONFIG ---

// --- END MOBILE HUB CONFIG ---
```
