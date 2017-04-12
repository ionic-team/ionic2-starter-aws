import { Inject, Injectable } from '@angular/core';
import { Config } from 'ionic-angular';
import * as AWS from 'aws-sdk';

// --- BEGIN MOBILE HUB CONFIG ---


// --- END MOBILE HUB CONFIG ---

@Injectable()
export class AwsConfig {
  public load() {
    const cfg = {
      "aws_mobile_analytics_app_id": aws_mobile_analytics_app_id,
      "aws_cognito_region": aws_cognito_region,
      "aws_cognito_identity_pool_id": aws_cognito_identity_pool_id,
      "aws_user_pools_id": aws_user_pools_id,
      "aws_user_pools_client_id": aws_user_pools_client_id,
      "aws_user_files_s3_bucket": aws_user_files_s3_bucket
    };
    AWS.config.customUserAgent = AWS.config.customUserAgent + ' Ionic';
    return cfg;
  }
}
