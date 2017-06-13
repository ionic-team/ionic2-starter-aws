import { Component } from '@angular/core';

import {IonicPage, NavController, LoadingController } from 'ionic-angular';

import { User } from '../../providers/user';

export class UserDetails {
    username: string;
    email: string;
    password: string;
}

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  public userDetails: UserDetails;

  error: any;

  constructor(public navCtrl: NavController,
              public user: User,
              public loadingCtrl: LoadingController) {
   this.userDetails = new UserDetails();
  }

  signup() {

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    let details = this.userDetails;
    this.error = null;
    console.log('register');
    this.user.register(details.username, details.password, {'email': details.email}).then((user) => {
      console.log('hooray', user);
      loading.dismiss();
      this.navCtrl.push('ConfirmPage', { username: details.username });
    }).catch((err) => {
      loading.dismiss();
      this.error = err;
    });
  }

  login() {
    this.navCtrl.push('LoginPage');
  }

}
