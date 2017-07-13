import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { AccountPage } from '../pages/account/account';
import { ConfirmPage } from '../pages/confirm/confirm';
import { LoginPage } from '../pages/login/login';
import { SettingsPage } from '../pages/settings/settings';
import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs/tabs';
import { TasksCreatePage } from '../pages/tasks-create/tasks-create';
import { TasksPage } from '../pages/tasks/tasks';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { Cognito } from '../providers/aws.cognito';
import { DynamoDB } from '../providers/aws.dynamodb';
import { User } from '../providers/user';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    AccountPage,
    ConfirmPage,
    LoginPage,
    SettingsPage,
    SignupPage,
    TabsPage,
    TasksCreatePage,
    TasksPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    AccountPage,
    ConfirmPage,
    LoginPage,
    SettingsPage,
    SignupPage,
    TabsPage,
    TasksCreatePage,
    TasksPage
  ],
  providers: [
    Camera,
    SplashScreen,
    StatusBar,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Cognito,
    DynamoDB,
    User
  ]
})
export class AppModule { }

declare var AWS;
AWS.config.customUserAgent = AWS.config.customUserAgent + ' Ionic';
