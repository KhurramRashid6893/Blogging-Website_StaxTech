const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type BlogPost {
    _id: ID!
    title: String!
    content: String!
    author: String!
    category: String!
    createdAt: String!
    likes: Int
    bookmarks: [String]
    comments: [Comment]
  }

  type Comment {
    text: String!
    author: String!
    createdAt: String!
  }

  type User {
    _id: ID!
    email: String!
    isAdmin: Boolean
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    getPosts: [BlogPost]
    getPost(id: ID!): BlogPost
  }

  type Mutation {
    createPost(title: String!, content: String!, author: String!, category: String!): BlogPost
    deletePost(id: ID!): Boolean
    updatePost(id: ID!, title: String, content: String, author: String, category: String): BlogPost
    addComment(postId: ID!, text: String!, author: String!): BlogPost
    likePost(postId: ID!): BlogPost
    bookmarkPost(postId: ID!, userEmail: String!): BlogPost
    signup(email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
  }
`;

module.exports = typeDefs;
