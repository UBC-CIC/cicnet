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
      about
      posts {
        items {
          id
          postId
          userId
          createdAt
          updatedAt
        }
        nextToken
      }
      users {
        items {
          id
          name
          email
          username
          userType
          about
          challenges
          createdAt
          updatedAt
        }
        nextToken
      }
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
      about
      posts {
        items {
          id
          postId
          userId
          createdAt
          updatedAt
        }
        nextToken
      }
      users {
        items {
          id
          name
          email
          username
          userType
          about
          challenges
          createdAt
          updatedAt
        }
        nextToken
      }
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
      about
      posts {
        items {
          id
          postId
          userId
          createdAt
          updatedAt
        }
        nextToken
      }
      users {
        items {
          id
          name
          email
          username
          userType
          about
          challenges
          createdAt
          updatedAt
        }
        nextToken
      }
      challenges
      createdAt
      updatedAt
    }
  }
`;
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost {
    onCreatePost {
      id
      title
      description
      postType
      users {
        items {
          id
          postId
          userId
          createdAt
          updatedAt
        }
        nextToken
      }
      sponsor
      students
      comments {
        items {
          id
          postID
          content
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost {
    onUpdatePost {
      id
      title
      description
      postType
      users {
        items {
          id
          postId
          userId
          createdAt
          updatedAt
        }
        nextToken
      }
      sponsor
      students
      comments {
        items {
          id
          postID
          content
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost {
    onDeletePost {
      id
      title
      description
      postType
      users {
        items {
          id
          postId
          userId
          createdAt
          updatedAt
        }
        nextToken
      }
      sponsor
      students
      comments {
        items {
          id
          postID
          content
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
export const onCreateUserPost = /* GraphQL */ `
  subscription OnCreateUserPost {
    onCreateUserPost {
      id
      postId
      userId
      post {
        id
        title
        description
        postType
        users {
          nextToken
        }
        sponsor
        students
        comments {
          nextToken
        }
        createdAt
        updatedAt
      }
      user {
        id
        name
        email
        username
        userType
        about
        posts {
          nextToken
        }
        users {
          nextToken
        }
        challenges
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUserPost = /* GraphQL */ `
  subscription OnUpdateUserPost {
    onUpdateUserPost {
      id
      postId
      userId
      post {
        id
        title
        description
        postType
        users {
          nextToken
        }
        sponsor
        students
        comments {
          nextToken
        }
        createdAt
        updatedAt
      }
      user {
        id
        name
        email
        username
        userType
        about
        posts {
          nextToken
        }
        users {
          nextToken
        }
        challenges
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUserPost = /* GraphQL */ `
  subscription OnDeleteUserPost {
    onDeleteUserPost {
      id
      postId
      userId
      post {
        id
        title
        description
        postType
        users {
          nextToken
        }
        sponsor
        students
        comments {
          nextToken
        }
        createdAt
        updatedAt
      }
      user {
        id
        name
        email
        username
        userType
        about
        posts {
          nextToken
        }
        users {
          nextToken
        }
        challenges
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
      id
      postID
      post {
        id
        title
        description
        postType
        users {
          nextToken
        }
        sponsor
        students
        comments {
          nextToken
        }
        createdAt
        updatedAt
      }
      content
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
      id
      postID
      post {
        id
        title
        description
        postType
        users {
          nextToken
        }
        sponsor
        students
        comments {
          nextToken
        }
        createdAt
        updatedAt
      }
      content
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
      id
      postID
      post {
        id
        title
        description
        postType
        users {
          nextToken
        }
        sponsor
        students
        comments {
          nextToken
        }
        createdAt
        updatedAt
      }
      content
      createdAt
      updatedAt
    }
  }
`;
