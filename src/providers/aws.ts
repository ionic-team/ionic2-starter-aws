import { Injectable } from '@angular/core';
import * as _AWS from 'aws-sdk';

import { config } from '../app/app.env';

@Injectable()
export class AWS {

  constructor() {
    let AWS = this.getAWS();
    AWS.config.region = config.aws.mobileHub.region;
    AWS.config.credentials = new _AWS.CognitoIdentityCredentials({
      'IdentityPoolId': config.aws.mobileHub.cognito.identityPoolId
    });
  }

  getAWS() {
    return _AWS;
  }

}
