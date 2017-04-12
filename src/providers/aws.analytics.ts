import { Injectable } from '@angular/core';
import { Config } from 'ionic-angular';

import AMA from 'aws-sdk-mobile-analytics';

@Injectable()
export class MobileAnalytics {

  private manager: any;

  constructor(public config: Config) {
    this.manager = new AMA.Manager({
      'appId': config.get('aws_mobile_analytics_app_id')
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
