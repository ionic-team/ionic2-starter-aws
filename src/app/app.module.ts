import { APP_INITIALIZER, NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { Config } from './app.config';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ConfirmPage } from '../pages/confirm/confirm';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { User } from '../providers/user';
import { AWS } from '../providers/aws';
import { Cognito } from '../providers/aws.cognito';
import { MobileAnalytics } from '../providers/aws.analytics';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SignupPage,
    ConfirmPage,
    HomePage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SignupPage,
    ConfirmPage,
    HomePage
  ],
  providers: [
    Config,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: APP_INITIALIZER, useFactory: (config: Config) => () => config.load(), deps: [Config], multi: true },
    User,
    AWS,
    Cognito,
    MobileAnalytics
  ]
})
export class AppModule {}
