import { Injectable } from '@angular/core';
import * as AWSCognito from 'amazon-cognito-identity-js';

import { AWS } from '../providers/providers';
import { config } from '../app/app.env';

@Injectable()
export class Cognito {

  constructor() {

  }

  getUserPool() {
    return new AWSCognito.CognitoUserPool({
      "UserPoolId": config.aws.mobileHub.cognito.userPoolId,
      "ClientId": config.aws.mobileHub.cognito.userPoolClientId
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
