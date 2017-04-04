import { Inject, Injectable } from '@angular/core';
import { config } from './app.env';

@Injectable()
export class Config {

    private config: Object = null;

    constructor() {
      this.config = config;
    }

    public getConfig(key: any) {
        return this.config[key];
    }

    public load() {
      console.log(this.config);
    }
}
