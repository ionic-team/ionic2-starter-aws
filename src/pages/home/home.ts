import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { TasksPage } from '../tasks/tasks';

import { DynamoDB, User } from '../../providers/providers';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public tasksPage: any;

  constructor(public navCtrl: NavController, public user: User, public db: DynamoDB) {
    this.tasksPage = TasksPage;
  }

}
