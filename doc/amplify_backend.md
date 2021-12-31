# Amplify Backend API/Functions
Docs for Amplify Backend Apis / Functions that are used in the project


## Apis

### cicnet

    UserType {
        ALUMNI
        CIC_STUDENT
        CIC_STAFF
        SPONSOR
    }

    type User @model {
        id: ID!
        name: String!
        firstname: String
        lastname: String
        email: AWSEmail
        username: String
        userType: UserType!
        confirmed: Boolean
        about: String
        coopEndDate: AWSDate
        challenges: [String] // TBD to connect with Challenge
    }

    type Challenge @model{
        id: ID!
        image: String
        title: String!
        description: String
        location: String!
        status: String!
        sponsors: [String]
        staffs: [String]
        students: [String]
        artifacts: [String]
        posts: [Post] @connection(keyName: "ChallengePosts", fields: ["id"])
    }

    enum PostType{
        UPDATE
        EVENT
    }

    type Post @model 
        @key(name: "ChallengePosts", fields: ["challengeID", "createdAt"], queryField: "postsByDate") {
        id: ID!
        image: [String]
        title: String!
        content: String!
        postType: PostType
        challengeID: ID!
        challenge: Challenge @connection(fields: ["challengeID"])
        createdAt: AWSDateTime!
    }



## AdminQueries

This is used to allow admin users to create/modify/delete users for CICNET, specifically for the Roles page.

## SendEmailNotifications
SIP: This is used to send email notifications to users if they want to receive event/news notifications. 


<hr>

# Functions

## AdminQueries
Similar to the API: this is used to allow admin users to create/modify/delete users for CICNET, specifically for the Roles page.

## CicnetauthPostConfirmation
This is a custom post confirmation function for Amplify Auth. When a user finish verifying their account during the registration, this function is called to customize some user data that will be added in the user dynamodb database. For example, we need to attach the usertype to the user. Moreover, since the user type is not verified by an admin or CIC Staff at this stage, they are moved to the general User Group which will only given them general public access to the site until the user is verified.

## SendEmailNotifications
Similar to the API: This is used to send email notifications to users if they want to receive event/news notifications. 

Note that "ses:SendEmail" and "ses:SendRawEmail" are attached to the lambda execution policies to allow emails to be sent. During development phase, only emails are that verified in [Simple Email Service](https://aws.amazon.com/ses/) can be used as recipients.

## UpdateCoopStatus
This is a scheduled lambda function that will check if the user have reached their co-op/work term end date. If they have, there are three things that will happen in the lambda: 1) their userType will be changed to Alumni, 2) they will be moved to the Alumni User Pool, 3) an email will be sent to them letting them know about their change of status (user type).

Note that "ses:SendEmail" and "ses:SendRawEmail" are attached to the lambda execution policies to allow emails to be sent. During development phase, only emails are that verified in [Simple Email Service](https://aws.amazon.com/ses/) can be used as recipients.