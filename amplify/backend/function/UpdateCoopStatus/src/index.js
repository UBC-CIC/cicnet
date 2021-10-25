/* Amplify Params - DO NOT EDIT
	API_CICNET_GRAPHQLAPIENDPOINTOUTPUT
	API_CICNET_GRAPHQLAPIIDOUTPUT
	API_CICNET_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const axios = require('axios');
const gql = require('graphql-tag');
const graphql = require('graphql');
const { print } = graphql;

const dateToday = new Date().toISOString().split("T")[0];
console.log("today's date", dateToday)
const listCICStudents = gql`
    query ListUsers {
        listUsers(filter: {
            coopEndDate: {eq: "${dateToday}"}, 
            userType: {ne: ALUMNI}
        }) {
            items {
                id
                userType
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
    // TODO implement
    try {
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
                
                await axios({
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
                });
                
            })
        )

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