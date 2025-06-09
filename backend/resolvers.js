const { ObjectId } = require("mongodb");
const bcrypt = require("bcryptjs");
const { getDB } = require("./db");
const { generateToken } = require("./utils/auth");

module.exports = {
  Query: {
    getPosts: async () => {
      const collection = getDB().collection("posts");
      return await collection.find().sort({ createdAt: -1 }).toArray();
    },
    getPost: async (_, { id }) => {
      const collection = getDB().collection("posts");
      return await collection.findOne({ _id: new ObjectId(id) });
    },
  },

  Mutation: {
    createPost: async (_, { title, content, author, category }) => {
      const collection = getDB().collection("posts");
      const now = new Date().toISOString();
      const result = await collection.insertOne({
        title,
        content,
        author,
        category,
        createdAt: now,
        likes: 0,
        bookmarks: [],
        comments: []
      });
      return {
        _id: result.insertedId,
        title,
        content,
        author,
        category,
        createdAt: now,
        likes: 0,
        bookmarks: [],
        comments: []
      };
    },

    deletePost: async (_, { id }) => {
      const collection = getDB().collection("posts");
      const result = await collection.deleteOne({ _id: new ObjectId(id) });
      return result.deletedCount === 1;
    },

    updatePost: async (_, { id, title, content, author, category }) => {
      const collection = getDB().collection("posts");
      const updates = {};
      if (title !== undefined) updates.title = title;
      if (content !== undefined) updates.content = content;
      if (author !== undefined) updates.author = author;
      if (category !== undefined) updates.category = category;
      await collection.updateOne({ _id: new ObjectId(id) }, { $set: updates });
      return await collection.findOne({ _id: new ObjectId(id) });
    },

    addComment: async (_, { postId, text, author }) => {
      const collection = getDB().collection("posts");
      const comment = { text, author, createdAt: new Date().toISOString() };
      await collection.updateOne(
        { _id: new ObjectId(postId) },
        { $push: { comments: comment } }
      );
      return await collection.findOne({ _id: new ObjectId(postId) });
    },

    likePost: async (_, { postId }) => {
      const collection = getDB().collection("posts");
      await collection.updateOne(
        { _id: new ObjectId(postId) },
        { $inc: { likes: 1 } }
      );
      return await collection.findOne({ _id: new ObjectId(postId) });
    },

    bookmarkPost: async (_, { postId, userEmail }) => {
      const collection = getDB().collection("posts");
      await collection.updateOne(
        { _id: new ObjectId(postId) },
        { $addToSet: { bookmarks: userEmail } }
      );
      return await collection.findOne({ _id: new ObjectId(postId) });
    },

    signup: async (_, { email, password }) => {
      const db = getDB();
      const existing = await db.collection("users").findOne({ email });
      if (existing) throw new Error("User already exists");
      const hashed = await bcrypt.hash(password, 10);
      const result = await db.collection("users").insertOne({ email, password: hashed });
      const user = { _id: result.insertedId, email };
      const token = generateToken(user);
      return { token, user };
    },

    login: async (_, { email, password }) => {
      const db = getDB();
      const user = await db.collection("users").findOne({ email });
      if (!user) throw new Error("User not found");
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error("Invalid password");
      const token = generateToken(user);
      return { token, user: { _id: user._id, email: user.email } };
    }
  }
};
