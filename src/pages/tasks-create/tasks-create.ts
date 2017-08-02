import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tasks-create',
  templateUrl: 'tasks-create.html'
})
export class TasksCreatePage {

  isReadyToSave: boolean;

  item: any;

  isAndroid: boolean;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public platform: Platform) {
    this.isAndroid = platform.is('android');
    this.item = {
      'taskId': navParams.get('id'),
      'category': 'Todo'
    };
    this.isReadyToSave = true;
  }

  ionViewDidLoad() {

  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  done() {
    this.viewCtrl.dismiss(this.item);
  }
}
