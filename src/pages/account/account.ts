import { Component, ViewChild } from '@angular/core';

import { Config, NavController } from 'ionic-angular';

import { AWS, DynamoDB, User } from '../../providers/providers';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {
  
  @ViewChild('avatar') avatarInput;

  private s3: any;
  public avatarPhoto: string;
  public attributes: any;

  constructor(public navCtrl: NavController, public aws: AWS, public user: User, public db: DynamoDB, public config: Config) {
    let self = this;
    let AWS = aws.getAWS();
    this.s3 = new AWS.S3({
      'params': {
        'Bucket': config.get('aws_user_files_s3_bucket')
      },
      'region': config.get('aws_user_files_s3_bucket_region')
    });
    this.avatarPhoto = 'http://' + config.get('aws_user_files_s3_bucket') + '.s3.amazonaws.com/public/avatars/' + this.user.getUser().getUsername();

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
        this.avatarPhoto = 'http://' + self.config.get('aws_user_files_s3_bucket') + '.s3.amazonaws.com/public/avatars/' + this.user.getUser().getUsername() + '?bustCache=' + new Date().getTime().toString();
        console.log('upload complete:', data);
      }).catch((err) => {
        console.log('upload failed....', err);
      });
    }
      
  }
}
