/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateChallenge = /* GraphQL */ `
  subscription OnCreateChallenge {
    onCreateChallenge {
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
export const onUpdateChallenge = /* GraphQL */ `
  subscription OnUpdateChallenge {
    onUpdateChallenge {
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
export const onDeleteChallenge = /* GraphQL */ `
  subscription OnDeleteChallenge {
    onDeleteChallenge {
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
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost {
    onCreatePost {
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost {
    onUpdatePost {
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost {
    onDeletePost {
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
