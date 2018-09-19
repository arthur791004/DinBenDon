# Notification

## Requirements
- claudia.js
- aws_access_key_id, aws_secret_access_key

## AWS
1. 使用 IAM 服務申請新的使用者（一組金鑰）
  - 並授權（attach）AdministratorAccess
2. Create AWS profie
  ```
  // ~/.aws/credentials
  [profileName]
  aws_access_key_id = YOUR_ACCESS_KEY
  aws_secret_access_key = YOUR_ACCESS_SECRET
  ```
3. Usage
  ```
  AWS_PROFILE=<profileName> claudia <options>
  ```

## Claudia
- Usage
  ```
  // create
  claudia create --region <region> --handler <fileName>.<funcionName> --profile <profileName>

  // update
  claudia update

  // invoke
  claudia test-lambda

  // invoke with event
  claudia test-lambda --event event.json

  // destroy
  claudia destroy
  ```
- Reference
  - [hello-world-lambda](https://claudiajs.com/tutorials/hello-world-lambda.html)
  - [add-scheduled-event](https://github.com/claudiajs/claudia/blob/master/docs/add-scheduled-event.md)