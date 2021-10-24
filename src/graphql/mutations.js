/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      name
      firstname
      lastname
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      name
      firstname
      lastname
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      name
      firstname
      lastname
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
export const createChallenge = /* GraphQL */ `
  mutation CreateChallenge(
    $input: CreateChallengeInput!
    $condition: ModelChallengeConditionInput
  ) {
    createChallenge(input: $input, condition: $condition) {
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
export const updateChallenge = /* GraphQL */ `
  mutation UpdateChallenge(
    $input: UpdateChallengeInput!
    $condition: ModelChallengeConditionInput
  ) {
    updateChallenge(input: $input, condition: $condition) {
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
export const deleteChallenge = /* GraphQL */ `
  mutation DeleteChallenge(
    $input: DeleteChallengeInput!
    $condition: ModelChallengeConditionInput
  ) {
    deleteChallenge(input: $input, condition: $condition) {
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
export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
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
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
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
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
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
