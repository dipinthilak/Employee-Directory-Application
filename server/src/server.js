import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import dotenv from "dotenv";
import { typeDefs, resolvers } from "./graphql/schema.js";
import { seedData } from "./utility/seeder.js";

dotenv.config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (err) => ({
    message: err.message,
    code: err.extensions?.code || "INTERANAL SERVER ERROR",
  }),
});

const { url } = await startStandaloneServer(server, {
  listen: { port: process.env.PORT || 4000 },
  cors: { origin: ["http://localhost:3001"], Credential: true },
});

// Optionally seed the database during development by running the seeder manually
// seedData();

console.log(`Server started at ${url}`);
