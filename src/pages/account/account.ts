import { Component, ViewChild } from '@angular/core';

import { NavController } from 'ionic-angular';

import { AWS, DynamoDB, User } from '../../providers/providers';
import { config } from '../../app/app.env';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {
  
  @ViewChild('avatar') avatarInput;

  private s3: any;
  public avatarPhoto: string;
  public attributes: any;

  constructor(public navCtrl: NavController, public aws: AWS, public user: User, public db: DynamoDB) {
    let self = this;
    let AWS = aws.getAWS();
    this.s3 = new AWS.S3({
      'params': {
        'Bucket': config.aws.mobileHub.s3.bucket
      },
      'region': config.aws.mobileHub.region,
    });
    this.avatarPhoto = 'http://' + config.aws.mobileHub.s3.bucket + '.s3.amazonaws.com/public/avatars/' + this.user.getUser().getUsername();

    user.getUser().getUserAttributes(function(err, data) {
      self.attributes = data;
    });
  }

  selectAvatar() {
    this.avatarInput.nativeElement.click();
  }

  upload() {
    let self = this;
    if (this.avatarInput.nativeElement.files[0]) {
      this.s3.upload({
        'Key': 'public/avatars/' + self.user.getUsername(),
        'Body': self.avatarInput.nativeElement.files[0],
        'ContentType': self.avatarInput.nativeElement.files[0].type,
        'ACL': 'public-read'
      }).promise().then((data) => {
        this.avatarPhoto = 'http://' + config.aws.mobileHub.s3.bucket + '.s3.amazonaws.com/public/avatars/' + this.user.getUser().getUsername() + '?bustCache=' + new Date().getTime().toString();
        console.log('upload complete:', data);
      }).catch((err) => {
        console.log('upload failed....', err);
      });
    }
      
  }
}
