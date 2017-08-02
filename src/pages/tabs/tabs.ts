import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { SettingsPage } from '../settings/settings';
import { TasksPage } from '../tasks/tasks';


@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = TasksPage;
  tab2Root = SettingsPage;

  constructor() {

  }
}
