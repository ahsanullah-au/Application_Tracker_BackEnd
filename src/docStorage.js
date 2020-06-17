const aws = require('aws-sdk');
const fs = require('fs');
const hash = require('object-hash')

const config = JSON.parse(fs.readFileSync('awsAccess.json'));

aws.config.update({
    region: 'us-east-2',
    accessKeyId: config.AWSAccessKeyId,
    secretAccessKey: config.AWSSecretKey
})

const handleDocStorage = (req, res) => {
    const s3 = new aws.S3();  // Create a new instance of S3
    //const fileURL = hash(req.body.user + req.body.fileName);
    const fileURL = req.body.fileName;
 
    // Set up the payload of what we are sending to the S3 api
    const s3Params = {
        Bucket: config.Bucket,
        Key: fileURL,
        Expires: 500,
        ContentType: req.body.fileType,
        ACL: 'public-read'
    }

    s3.getSignedUrl('putObject', s3Params, (err, url) => {
        if (err){
            console.log(err)
            return res.status(400).JSON("Error")
        }
        else{
            const returnData = {
                signedRequest: url,
                returnURL: `https://${config.Bucket}.s3.amazonaws.com/${fileURL}`
            } 

            res.json(returnData);
        }

        

    })


}
module.exports = {
    handleDocStorage
}
