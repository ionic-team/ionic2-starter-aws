import { Injectable } from '@angular/core';

import AMA from 'aws-sdk-mobile-analytics';
import { config } from '../app/app.env';

@Injectable()
export class MobileAnalytics {

  private manager: any;

  constructor() {
    this.manager = new AMA.Manager({
      'appId': config.aws.mobileHub.appId
    });
  }

  getManager() {
    return this.manager;
  }


  track(event: string) {
    console.log('tracking event: ' + event);
    this.manager.recordEvent(event);
  }

  flush() {
    this.manager.submitEvents();
    console.log(this.manager);
  }

}
