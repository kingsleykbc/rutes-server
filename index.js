const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schema');
const express = require('express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const http = require('http');
const expressJwt = require('express-jwt');

// Initialize environment variables
require('dotenv').config();

// Connect to MongoDB
require('./helpers/initializeMongoDB');

/**
 * SETUP APOLLO SERVER
 * @param {Object} typeDefs - Type definitions
 * @param {Object} resolvers - Resolvers
 */
async function startApolloServer(typeDefs, resolvers) {
	const app = express();

	// Setup JWT middleware
	app.use(expressJwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'], credentialsRequired: false }));

	// Initialize server
	const httpServer = http.createServer(app);
	const server = new ApolloServer({
		typeDefs,
		resolvers,
		context: ({ req }) => {
			return { user: req.user || null };
		},
		plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
	});

	// Run server
	await server.start();
	server.applyMiddleware({ app });
	httpServer.listen({ port: process.env.PORT });
	console.log(`Listening on: http://localhost:${process.env.PORT}${server.graphqlPath}`);
}

// Run server
startApolloServer(typeDefs, resolvers);
