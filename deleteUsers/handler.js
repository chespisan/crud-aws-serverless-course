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

const deleteUsers = async (event, context) => {

  const userId = event.pathParameters.id

  const params = {
    // ExpressionAttributeValues: { ':pk': userId },
    // KeyConditionExpression: 'pk = :pk',
    Key: { pk: userId }, // key del user
    TableName: 'usersTable',
  };

  const res = await dynamodb.delete(params).promise()

  return {
    'statusCode': 200,
    'body': JSON.stringify({ 'Message': 'Registro eliminado' })  
  }
}

module.exports = {
    deleteUsers
}
