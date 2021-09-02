/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      email
      username
      userType
      confirmed
      about
      coopEndDate
      challenges
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        username
        userType
        confirmed
        about
        coopEndDate
        challenges
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getChallenge = /* GraphQL */ `
  query GetChallenge($id: ID!) {
    getChallenge(id: $id) {
      id
      image
      title
      description
      location
      status
      sponsors
      staffs
      students
      artifacts
      posts {
        items {
          id
          image
          title
          content
          postType
          challengeID
          challenge {
            id
            image
            title
            description
            location
            status
            sponsors
            staffs
            students
            artifacts
            posts {
              nextToken
            }
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listChallenges = /* GraphQL */ `
  query ListChallenges(
    $filter: ModelChallengeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChallenges(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        image
        title
        description
        location
        status
        sponsors
        staffs
        students
        artifacts
        posts {
          items {
            id
            image
            title
            content
            postType
            challengeID
            challenge {
              id
              image
              title
              description
              location
              status
              sponsors
              staffs
              students
              artifacts
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      image
      title
      content
      postType
      challengeID
      challenge {
        id
        image
        title
        description
        location
        status
        sponsors
        staffs
        students
        artifacts
        posts {
          items {
            id
            image
            title
            content
            postType
            challengeID
            challenge {
              id
              image
              title
              description
              location
              status
              sponsors
              staffs
              students
              artifacts
              createdAt
              updatedAt
            }
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        image
        title
        content
        postType
        challengeID
        challenge {
          id
          image
          title
          description
          location
          status
          sponsors
          staffs
          students
          artifacts
          posts {
            items {
              id
              image
              title
              content
              postType
              challengeID
              createdAt
              updatedAt
            }
            nextToken
          }
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const postsByDate = /* GraphQL */ `
  query PostsByDate(
    $challengeID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postsByDate(
      challengeID: $challengeID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        image
        title
        content
        postType
        challengeID
        challenge {
          id
          image
          title
          description
          location
          status
          sponsors
          staffs
          students
          artifacts
          posts {
            items {
              id
              image
              title
              content
              postType
              challengeID
              createdAt
              updatedAt
            }
            nextToken
          }
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
