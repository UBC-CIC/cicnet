const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB() // new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context, callback) => {
  let date = new Date().toISOString();
  console.log(event)

  if (event.request.userAttributes.sub) {
    const ddbParams = {
      TableName: process.env.USERTABLE,
      Item: {
        'id': {S: event.request.userAttributes.sub},
        '__typename': {S: 'User'},
        'name': {
          S: 
          !! event.request.userAttributes.given_name 
          ? 
          `${event.request.userAttributes.given_name} ${event.request.userAttributes.family_name}`
          :
          event.request.userAttributes.name
        },
        'email': {S: event.request.userAttributes.email},
        'userType': {S: event.request.userAttributes.profile},
        'createdAt': {S: date},
        'updatedAt': {S: date},
      }
    };

    console.log("params", ddbParams)

    try {
      await ddb.putItem(ddbParams).promise();
      console.log("Success: Everything executed correctly")
      context.done(null, event)
    } catch (err) {
      console.log("Error", err)
      context.fail(null, event)
    }

  } else {
    console.log("Error: Data not retrieved from cognito")
    context.fail(null, event)
  }
};
