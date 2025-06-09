const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const { connectDB } = require("./db");

const startServer = async () => {
  const app = express();
  app.use(cors());

  // Initialize Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();
  server.applyMiddleware({ app });

  // Connect to MongoDB
  await connectDB();

  // Start Express server
  app.listen(4000, () => {
    console.log("🚀 Server ready at http://localhost:4000/graphql");
  });
};

startServer();
