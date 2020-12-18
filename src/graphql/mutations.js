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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
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
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
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
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
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
export const createUserPost = /* GraphQL */ `
  mutation CreateUserPost(
    $input: CreateUserPostInput!
    $condition: ModelUserPostConditionInput
  ) {
    createUserPost(input: $input, condition: $condition) {
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
export const updateUserPost = /* GraphQL */ `
  mutation UpdateUserPost(
    $input: UpdateUserPostInput!
    $condition: ModelUserPostConditionInput
  ) {
    updateUserPost(input: $input, condition: $condition) {
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
export const deleteUserPost = /* GraphQL */ `
  mutation DeleteUserPost(
    $input: DeleteUserPostInput!
    $condition: ModelUserPostConditionInput
  ) {
    deleteUserPost(input: $input, condition: $condition) {
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
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
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
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
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
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
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
