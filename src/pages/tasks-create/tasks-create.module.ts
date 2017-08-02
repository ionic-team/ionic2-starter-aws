import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TasksCreatePage } from './tasks-create';

@NgModule({
  declarations: [
    TasksCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(TasksCreatePage),
  ],
  exports: [
    TasksCreatePage
  ]
})
export class TasksCreatePageModule { }
