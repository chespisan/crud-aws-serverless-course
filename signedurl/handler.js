const AWS = require('aws-sdk')

const s3 = new AWS.S3({ signatureVersion: 'v4' }) // escogemos la version que ya se puede firmar

const signedS3URL = async (event, context) => {
  const filename = event.queryStringParameters.filename
  console.log('filename: ', filename);
  const signedUrl = await s3.getSignedUrlPromise('putObject', {
    Key: `uploads/${filename}`,
    Bucket: process.env.BUCKET,
    Expires: 300,
  })
  return {
    'statusCode': 200,
    'body': JSON.stringify({signedUrl})
  }
}

module.exports = {
  signedS3URL
}