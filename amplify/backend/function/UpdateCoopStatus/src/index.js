/* Amplify Params - DO NOT EDIT
	API_CICNET_GRAPHQLAPIENDPOINTOUTPUT
	API_CICNET_GRAPHQLAPIIDOUTPUT
	API_CICNET_GRAPHQLAPIKEYOUTPUT
	AUTH_CICNETAUTH_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

var aws = require("aws-sdk");
var ses = new aws.SES({ apiVersion: '2010-12-01', region: process.env.REGION });

const axios = require('axios');
const gql = require('graphql-tag');
const graphql = require('graphql');
const { print } = graphql;

const { CognitoIdentityServiceProvider } = require('aws-sdk');
const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider();

const dateToday = new Date().toISOString().split("T")[0];
console.log("today's date", dateToday)
const listCICStudents = gql`
    query ListUsers {
        listUsers(filter: {
            coopEndDate: { lt: "${dateToday}"}, 
            userType: { ne: "ALUMNI" }
        }) {
            items {
                id
                userType
                email
            }
        }
    }
`

const updateStudentRole = gql`
    mutation UpdateUser($input: UpdateUserInput!) {
        updateUser(input: $input) {
            id
            userType
        }
    }
`

exports.handler = async (event) => {
    try {
        console.log("inside handler")
        // 1. query CIC Students that need to be updated
        const CICStudentsToUpdate = await axios({
            url: process.env.API_CICNET_GRAPHQLAPIENDPOINTOUTPUT,
            method: 'post',
            headers: {
                'x-api-key': process.env.API_CICNET_GRAPHQLAPIKEYOUTPUT
            },
            data: {
                query: print(listCICStudents),
            }
        }).then(data => data.data.data.listUsers.items)
        
        // 2. mutate userType
        await Promise.all(
            CICStudentsToUpdate.map(async (student) => {
                console.log("a student", student)
                
                return await axios({
                    url: process.env.API_CICNET_GRAPHQLAPIENDPOINTOUTPUT,
                    method: 'post',
                    headers: {
                        'x-api-key': process.env.API_CICNET_GRAPHQLAPIKEYOUTPUT
                    },

                    data: {
                        query: print(updateStudentRole),
                        variables: {
                            input: {
                                id: student.id,
                                userType: "ALUMNI"
                            }
                        }
                    }
                }).then(async(res) => {
                    console.log("success update ddb")
                    await transferUserToGroup(student.id);
                }).then((res) => {
                    return student.email
                }).catch((err) => {
                    throw new Error("Received Error:", err);
                })
            })
        ).then((emailList) => {
            if (!!emailList.length) {
                sendEmails(emailList);
            }
        });

        return {
            statusCode: 200,
            body: JSON.stringify("Successfully update student roles"),
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            }
        }
    } catch (err) {
        console.log('error posting to appsync: ', err);
    } 
};

async function transferUserToGroup(id) {
    const params = {
      UserPoolId: process.env.AUTH_CICNETAUTH_USERPOOLID,
      Username: id,
    };
  
    try {
        await cognitoIdentityServiceProvider.adminRemoveUserFromGroup({
            ...params,
            GroupName: "CICStudent",
        }).promise();

        await cognitoIdentityServiceProvider.adminAddUserToGroup({
            ...params,
            GroupName: "Alumni",
        }).promise();
    } catch (err) {
        console.log(err);
        throw err;
    }
}

function sendEmails(emailList) {
    var params = {
        Destination: {
            // https://stackoverflow.com/questions/37528301/email-address-is-not-verified-aws-ses
            ToAddresses: emailList,
        },
        Message: {
            Body: {
                Text: { Data: `Test ses on ${new Date()}` },
            },

            Subject: { Data: "Test Email CICNET" },
        },
        Source: process.env.SOURCE_EMAIL,
    };
    
    try {
        ses.sendEmail(params).promise();
    } catch (err) {
        console.log("error sending emails", err);
        throw err;
    }
    
}