// exports.handler = async (event) => {
//     // TODO implement
//     const response = {
//         statusCode: 200,
//     //  Uncomment below to enable CORS requests
//     //  headers: {
//     //      "Access-Control-Allow-Origin": "*",
//     //      "Access-Control-Allow-Headers": "*"
//     //  }, 
//         body: JSON.stringify('Hello from Lambda!'),
//     };
//     return response;
// };


// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

var aws = require("aws-sdk");
var ses = new aws.SES({ region: "us-west-2" });
exports.handler = async function (event) {
    console.log(event)
    var params = {
        Destination: {
        ToAddresses: ["RecipientEmailAddress"],
        },
        Message: {
        Body: {
            Text: { Data: "Test" },
        },

        Subject: { Data: "Test Email" },
        },
        Source: "SourceEmailAddress",
    };
    
    return ses.sendEmail(params).promise()
};