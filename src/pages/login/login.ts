import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';
import { ConfirmPage } from '../confirm/confirm';

import { User, MobileAnalytics } from '../../providers/providers';

export class LoginDetails {
  username: string;
  password: string;
}

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  
  public loginDetails: LoginDetails;

  constructor(public navCtrl: NavController, public user: User, public analytics: MobileAnalytics) {
    this.loginDetails = new LoginDetails(); 
  }

  login() {
    let details = this.loginDetails;
    console.log('login..');
    this.user.login(details.username, details.password).then((result) => {
      console.log('result:', result);
      this.analytics.track('userAuthenticated');
      this.analytics.flush();
      this.navCtrl.setRoot(HomePage);
    }).catch((err) => { 
      if (err.message === "User is not confirmed.") {
        this.navCtrl.push(ConfirmPage, { 'username': details.username });
      }
      console.log('errrror', err);
    });
  }

  signup() {
    this.navCtrl.push(SignupPage);
  }

}
