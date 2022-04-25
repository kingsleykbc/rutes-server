const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers, dataSources } = require('./schema');
const express = require('express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const http = require('http');
const expressJwt = require('express-jwt');

// Configure environment variables
const dotenv = require('dotenv');
dotenv.config();

// Connect to MongoDB
require('./helpers/initializeMongoDB');

// Setup apollo server
async function startApolloServer(typeDefs, resolvers) {
	const app = express();

	// Setup JWT middleware
	app.use(expressJwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'], credentialsRequired: false }));

	const httpServer = http.createServer(app);

	// Initialize server
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
	await httpServer.listen({ port: 8080 });
	console.log(`🚀 Server ready at http://localhost:8080${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers);
