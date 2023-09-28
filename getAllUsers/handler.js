const aws = require('aws-sdk')

let dynamoDBClientParams = {}

if (process.env.IS_OFFLINE) {
  dynamoDBClientParams = {
    region: 'localhost',
    endpoint: 'http://localhost:8000',
    accessKeyId: 'DEFAULTACCESSKEY',  // needed if you don't have aws credentials at all in env
    secretAccessKey: 'DEFAULTSECRET' // needed if you don't have aws credentials at all in env
  }
}

const dynamodb = new aws.DynamoDB.DocumentClient(dynamoDBClientParams)

const getAllUsers = async (event, context) => {

  const params = {
    TableName: 'usersTable'
  };

  const res = await dynamodb.scan(params).promise()

  return {
    'statusCode': 200,
    'body': JSON.stringify({'users': res})  
  }
}

module.exports = {
    getAllUsers
}
