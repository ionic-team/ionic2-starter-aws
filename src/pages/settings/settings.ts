import { Component } from '@angular/core';
import {IonicPage, App } from 'ionic-angular';

import { User } from '../../providers/providers';

@IonicPage()
@Component({
  templateUrl: 'settings.html'
})
export class SettingsPage {

  public aboutPage = 'AboutPage';
  public accountPage = 'AccountPage';

  constructor(public user: User, public app: App) {
  }

  logout() {
    this.user.logout();
    this.app.getRootNav().setRoot('LoginPage');
  }

}
