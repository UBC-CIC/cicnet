const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB() // new AWS.DynamoDB.DocumentClient();

const { CognitoIdentityServiceProvider } = require('aws-sdk');

const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider();

async function addUserToGroup(event) {
  const params = {
    GroupName: process.env.GROUP,
    UserPoolId: event.userPoolId,
    Username: event.userName,
  };

  console.log("Trying to add user to group with params:", params)
  try {
    await cognitoIdentityServiceProvider.adminAddUserToGroup(params).promise();
    console.log(`Success adding ${params.Username} to ${params.GroupName}`);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function addUserInfoInDDB(event, context) {
  let date = new Date().toISOString();
  console.log(event)

  if (event.request.userAttributes.sub) {
    const ddbParams = {
      TableName: process.env.API_CICNET_USERTABLE_NAME,
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
      console.log("Success: Item is put into ddb correctly")
    } catch (err) {
      console.log(err);
      throw err;
    }
  } else {
    console.log("Error: Data not retrieved from cognito")
    context.fail(null, event)
  }
}


exports.handler = async (event, context, callback) => {
    try {
      await addUserInfoInDDB(event, context)
      await addUserToGroup(event);
      context.done(null, event)
    } catch (err) {
      console.log("Error", err)
      context.fail(null, event)
    }
};
