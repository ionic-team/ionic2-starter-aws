import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { ConfirmPage } from '../confirm/confirm';

import { User } from '../../providers/user';

export class UserDetails {
    username: string;
    email: string;
    password: string;
}

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  public userDetails: UserDetails;

  constructor(public navCtrl: NavController, public user: User) {
   this.userDetails = new UserDetails();
  }

  signup() {
    let details = this.userDetails;
    console.log('register');
    this.user.register(details.username, details.password, {'email': details.email}).then((user) => {
      console.log('hooray', user);
      this.navCtrl.push(ConfirmPage, { username: details.username });
    }).catch((err) => {
      console.log('uh-oh', err);
    }); 
  }

  login() {
    this.navCtrl.push(LoginPage);
  }

}
