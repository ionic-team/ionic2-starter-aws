import { Injectable } from '@angular/core';

import { AWS } from '../providers/aws';
import { config } from '../app/app.env';

@Injectable()
export class DynamoDB {

  private documentClient: any;

  constructor(public aws: AWS) {
    let AWS = aws.getAWS();
    this.documentClient = new AWS.DynamoDB.DocumentClient();
  }

  getDocumentClient() {
    return this.documentClient;
  }

}
