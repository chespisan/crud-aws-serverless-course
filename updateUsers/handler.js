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

const updateUsers = async (event, context) => {
  
  const userId = event.pathParameters.id
  const userBody = JSON.parse(event.body)

  const params = {
    TableName: 'usersTable',
    Key: { pk: userId }, // key del user
    UpdateExpression: `
        SET 
        #name = :name,
        #phone = :phone
    `, // para setear el update
    ExpressionAttributeNames: { 
      '#name' : 'name',
      '#phone' : 'phone'
    }, //
    ExpressionAttributeValues: { 
      ':name' : userBody.name,
      ':phone' : userBody.phone
    }, //
    ReturnValues: 'ALL_NEW' // return los nuevos valores
  };

  const res = await dynamodb.update(params).promise()

  return {
    'statusCode': 200,
    'body': JSON.stringify({ 'user': res.Attributes })  
  }
}

module.exports = {
  updateUsers
}
