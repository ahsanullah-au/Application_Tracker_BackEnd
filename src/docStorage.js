//This handles all generation of presigned URL in AWS
//Also handles deletion of uploaded docs

const aws = require('aws-sdk');
const fs = require('fs');
const hash = require('object-hash')

const config = JSON.parse(fs.readFileSync('awsAccess.json'));

//Stored in file for security
aws.config.update({
    region: 'us-east-2',
    accessKeyId: config.AWSAccessKeyId,
    secretAccessKey: config.AWSSecretKey
})

//Returns presigned URL, hashes filename+userID for more security and to avoid collisions
const handleAWSDocAddition = (req, res) => {
    const s3 = new aws.S3({
        'signatureVersion': 'v4'
    });  
    const fileURL = hash(req.body.user + req.body.fileName) + "." + req.body.fileType;

    const s3Params = {
        Bucket: config.Bucket,
        Key: fileURL,
        Expires: 500,
        ContentType: "application/octet-stream",//Allows various types
        ACL: 'public-read'
    }

    s3.getSignedUrl('putObject', s3Params, (err, url) => {
        if (err) {
            console.log(err)
            return res.status(400).JSON("Error")
        }
        else {
            const returnData = {
                signedRequest: url,
                fileName: fileURL,
                returnURL: `https://${config.Bucket}.s3.amazonaws.com/${fileURL}`
            }

            res.json(returnData);
        }
    })
}

//Deletes from S3 Bucket
const handleAWSDocDeletion = (req, res) => {
    const s3 = new aws.S3({
        'signatureVersion': 'v4'
    });  
    const fileKey = req.body.URL.substring(req.body.URL.lastIndexOf('/') + 1);

    const s3Params = {
        Bucket: config.Bucket,
        Key: fileKey
    }

    s3.deleteObject(s3Params, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(400).JSON("Error")
        }
        else {
            return res.json("Successful Delete")
        }
    });

}

module.exports = {
    handleAWSDocAddition,
    handleAWSDocDeletion
}
