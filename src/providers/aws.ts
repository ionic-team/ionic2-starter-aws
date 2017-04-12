import { Injectable } from '@angular/core';
import { Config } from 'ionic-angular';

import * as _AWS from 'aws-sdk';

@Injectable()
export class AWS {

  constructor(public config: Config) {
    let AWS = this.getAWS();
    AWS.config.region = config.get('aws_cognito_region');
    AWS.config.credentials = new _AWS.CognitoIdentityCredentials({
      'IdentityPoolId': config.get('aws_cognito_identity_pool_id')
    });
  }

  getAWS() {
    return _AWS;
  }

}
