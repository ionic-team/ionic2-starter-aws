import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';

import { MobileAnalytics, User } from '../../providers/providers';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public user: User, public analytics: MobileAnalytics) {
   analytics.track('viewedHomepage'); 
  }

  logout() {
    this.user.logout();
    this.navCtrl.setRoot(LoginPage);
  }
}
