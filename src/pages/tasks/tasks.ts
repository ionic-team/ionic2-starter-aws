import { Component } from '@angular/core';

import { NavController, ModalController } from 'ionic-angular';
import { TasksCreatePage } from '../tasks-create/tasks-create';

import { DynamoDB, User } from '../../providers/providers';

declare var AWS: any;

@Component({
  selector: 'page-tasks',
  templateUrl: 'tasks.html'
})
export class TasksPage {

  public items: any;
  public refresher: any;
  private taskTable: string = 'ionic-mobile-hub-tasks';

  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              public user: User,
              public db: DynamoDB) {

    this.refreshTasks();
  }

  refreshData(refresher) {
    this.refresher = refresher;
    this.refreshTasks()
  }

  refreshTasks() {
    var self = this;
    this.db.getDocumentClient().query({
      'TableName': self.taskTable,
      'IndexName': 'DateSorted',
      'KeyConditionExpression': "#userId = :userId",
      'ExpressionAttributeNames': {
        '#userId': 'userId',
      },
      'ExpressionAttributeValues': {
        //':userId': self.user.getUser().getUsername(),
        ':userId': AWS.config.credentials.identityId
      },
      'ScanIndexForward': false
    }).promise().then((data) => {
      this.items = data.Items;
      if (this.refresher) {
        this.refresher.complete();
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  generateId() {
    var len = 16;
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charLength = chars.length;
    var result = "";
    let randoms = window.crypto.getRandomValues(new Uint32Array(len));
    for(var i = 0; i < len; i++) {
      result += chars[randoms[i] % charLength];
    }
    return result.toLowerCase();
  }

  addTask() {
    let id = this.generateId();
    let addModal = this.modalCtrl.create(TasksCreatePage, { 'id': id });
    let self = this;
    addModal.onDidDismiss(item => {
      if (item) {
        item.userId = AWS.config.credentials.identityId;
        item.created = (new Date().getTime() / 1000);
        self.db.getDocumentClient().put({
          'TableName': self.taskTable,
          'Item': item,
          'ConditionExpression': 'attribute_not_exists(id)'
        }, function(err, data) {
          if (err) { console.log(err); }
          self.refreshTasks();
        });
      }
    })
    addModal.present();
  }

  deleteTask(task, index) {
    let self = this;
    this.db.getDocumentClient().delete({
      'TableName': self.taskTable,
      'Key': {
        'userId': AWS.config.credentials.identityId,
        'taskId': task.taskId
      }
    }).promise().then((data) => {
      this.items.splice(index, 1);
    }).catch((err) => {
      console.log('there was an error', err);
    });
  }

}
