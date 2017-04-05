import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { TasksPage } from '../tasks/tasks';

import { DynamoDB, MobileAnalytics, User } from '../../providers/providers';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public tasksPage: any;

  constructor(public navCtrl: NavController, public user: User, public analytics: MobileAnalytics, public db: DynamoDB) {
    this.tasksPage = TasksPage;
  }

  logout() {
    this.user.logout();
    this.navCtrl.setRoot(LoginPage);
  }
}
