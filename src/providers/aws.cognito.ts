import { Injectable } from '@angular/core';
import { Config } from 'ionic-angular';
import * as AWSCognito from 'amazon-cognito-identity-js';

import { AWS } from '../providers/providers';

@Injectable()
export class Cognito {

  constructor(public config: Config) {

  }

  getUserPool() {
    let self = this;
    return new AWSCognito.CognitoUserPool({
      "UserPoolId": self.config.get('aws_user_pools_id'),
      "ClientId": self.config.get('aws_user_pools_client_id')
    });
  }

  getCurrentUser() {
    return this.getUserPool().getCurrentUser();
  }

  makeAuthDetails(username, password) {
    return new AWSCognito.AuthenticationDetails({
      'Username': username,
      'Password': password
    });
  }

  makeAttribute(name, value) {
    return new AWSCognito.CognitoUserAttribute({
      'Name': name,
      'Value': value
    });
  }

  makeUser(username) {
    return new AWSCognito.CognitoUser({
      'Username': username,
      'Pool': this.getUserPool()
    });
  }


}
