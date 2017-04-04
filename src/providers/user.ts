import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { config } from '../app/app.env';
import { AWS } from './providers';
import { Cognito } from './providers';


@Injectable()
export class User {

  private user: any;
  public loggedIn: boolean = false;

  constructor(public http: Http, public aws: AWS, public cognito: Cognito) {
    this.user = null;
  }

  login(username, password) {
    return new Promise((resolve, reject) => {
      let self = this;
      let user = this.cognito.makeUser(username);
      let authDetails = this.cognito.makeAuthDetails(username, password);
      let AWS = this.aws.getAWS();

      user.authenticateUser(authDetails, {
        'onSuccess': function(result) {
          var logins = {};
          var loginKey = 'cognito-idp.' + 
                          config.aws.mobileHub.region + 
                          '.amazonaws.com/' + 
                          config.aws.mobileHub.cognito.userPoolId;
          logins[loginKey] = result.getIdToken().getJwtToken();

          AWS.config.credentials = new AWS.CognitoIdentityCredentials({
           'IdentityPoolId': config.aws.mobileHub.cognito.identityPoolId,
           'Logins': logins
          });

          resolve(result);
        },

        'onFailure': function(err) {
          console.log('authentication failed');
          reject(err);
        }
      });
    });
  }

  logout() {
    this.user = null;
    this.cognito.getUserPool().getCurrentUser().signOut();
  }

  register(username, password, attr) {
    let attributes = [];

    for (var x in attr) {
      attributes.push(this.cognito.makeAttribute(x, attr[x]));
    }
    
    return new Promise((resolve, reject) => {
      this.cognito.getUserPool().signUp(username, password, attributes, null, function(err, result) {
        if (err) { 
          reject(err);
        } else {
          resolve(result.user);
        }
      });
    });
  }
  
  confirmRegistration(username, code) {
    return new Promise((resolve, reject) => {
      let user = this.cognito.makeUser(username);
      user.confirmRegistration(code, true, (err, result) => {
            if (err) {
              console.log('could not confirm user', err);
              reject(err);
            } else {
              resolve(result);
            }
        });
    });
  }

  resendRegistrationCode(username) {
    return new Promise((resolve, reject) => {
      let user = this.cognito.makeUser(username);
      user.resendConfirmationCode((err, result) => {
        if (err) {
          console.log('could not resend code..', err);
          reject(err);
        } else {
          resolve();
        } 
      });
    });
  }

  isAuthenticated() {
    return new Promise((resolve, reject) => {
      let user = this.cognito.getCurrentUser();
      if (user != null) {
        user.getSession((err, session) => {
          if (err) {
            reject()
          } else {
            resolve()
          } 
        });
      } else {
        reject()
      }
    });
  }
}
