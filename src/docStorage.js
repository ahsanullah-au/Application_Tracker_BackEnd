const aws = require('aws-sdk');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('awsAccess.json'));

aws.config.update({
    region: 'us-east-1',
    accessKeyId: config.AWSAccessKeyId,
    secretAccessKey: config.AWSSecretKey
})

const S3_BUCKET = config.Bucket
