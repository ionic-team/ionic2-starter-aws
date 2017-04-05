import { Component } from '@angular/core';

import { NavController, ModalController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { TasksCreatePage } from '../tasks-create/tasks-create';

import { DynamoDB, MobileAnalytics, User } from '../../providers/providers';

@Component({
  selector: 'page-tasks',
  templateUrl: 'tasks.html'
})
export class TasksPage {

  public items: any;
  private taskTable: string = 'swamidemo-mobilehub-2087048444-tasks';

  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              public user: User,
              public analytics: MobileAnalytics,
              public db: DynamoDB) {

    this.refreshTasks();
  }

  refreshTasks() {
    var self = this;
    this.db.getDocumentClient().query({
      'TableName': self.taskTable,
      'IndexName': 'userId-created',
      'KeyConditionExpression': "#userId = :userId",
      'ExpressionAttributeNames': {
        '#userId': 'userId',
      },
      'ExpressionAttributeValues': {
        ':userId': self.user.getUser().getUsername(),
      },
      'ScanIndexForward': false
    }, function(err, data) {
      console.log(err);
      console.log(data);          
      self.items = data.Items;
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
    return result;
  }

  addTask() {
    let id = this.generateId();
    let addModal = this.modalCtrl.create(TasksCreatePage, { 'id': id });
    let self = this;
    addModal.onDidDismiss(item => {
      if (item) {
        item.userId = self.user.getUser().getUsername();
        item.created = (new Date().getTime() / 1000).toString();
        self.db.getDocumentClient().put({
          'TableName': self.taskTable,
          'Item': item,
          'ConditionExpression': 'attribute_not_exists(id)'
        }, function(err, data) {
          console.log(err);
          console.log(data);          
        });
        console.log('item is', item);
        self.refreshTasks();
      }
    })
    addModal.present();
  }

  deleteTask(task) {
    let self = this;
    this.db.getDocumentClient().delete({
      'TableName': self.taskTable,
      'Key': {
        'id': task.id
      }
    }, function(err, data) {
      console.log(err);
      console.log(data);          
    });
  }

}
