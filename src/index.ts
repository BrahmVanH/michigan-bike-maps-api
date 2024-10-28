import dotenv from 'dotenv';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import cors from 'cors';
import http from 'http';
import { buildSchema } from 'type-graphql';
import { constraintDirective, constraintDirectiveTypeDefs } from 'graphql-constraint-directive';
import { rateLimitDirective } from 'graphql-rate-limit-directive';
import { TrackResolver } from './lib/graphql/resolvers';
import AppDataSource from './database/dataSource';
import { CustomContext } from 'types/types';

import { GraphQLSchema } from 'graphql';

// Configre environment variables

dotenv.config();

// Create express app instance

const app = express();

// Create an http server to use locally - hosting provider will
// provide Secure transfers in production

const httpServer = http.createServer(app);

// Declare local port or allow hosting provider to assign port

const port = process.env.PORT ?? 4000;

// Create schema and apply constraint directives for validation

// let schema = makeExecutableSchema({
// 	typeDefs: [constraintDirectiveTypeDefs, rateLimitDirectiveTypeDefs, typeDefs],
// 	resolvers,
// });

// const typeDefs = readFileSync('../schema.graphql', 'utf-8');

const initializeDatabase = async () => {
	try {
		await AppDataSource.initialize();
		console.log('Database initialized');
	} catch (err) {
		console.error('Error initializing database', err);
		throw err;
	}
};

const createSchema = async () => {
	try {
		const { rateLimitDirectiveTypeDefs, rateLimitDirectiveTransformer } = rateLimitDirective();

		let schema = await buildSchema({
			resolvers: [TrackResolver],
			validate: false,
		});

		schema = constraintDirective()(schema);
		schema = rateLimitDirectiveTransformer(schema);

		return schema;
	} catch (err) {
		console.error('Error creating schema', err);
	}
};

// Apply constraint and rate limit directives to schema

// Create Apollo Server instance

const createApolloServer = (schema: GraphQLSchema) => {
	const server = new ApolloServer<CustomContext>({
		schema,
		introspection: true,
		plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
	});

	return server;
};

const setupMiddleware = async (server: ApolloServer<CustomContext>) => {
	const allowedOrigins = process.env.CORS_ORIGINS?.split(',') || [];
	await server.start();

	app.use(
		'/graphql',
		cors({
			origin: allowedOrigins,
			credentials: true,
		}),
		express.json(),
		expressMiddleware(server, {
			context: async ({ req, res }) => ({
				dataSource: AppDataSource,
				req,
				res,
			}),
		})
	);
};

// Allow only specified origins to access the server

// Start Apollo Server, Apply middleware to express app, including CORS and JSON parsing,
// allows server to use /graphql endpoint
// Add access-control-allow-credentials header to allow cookies to be sent to the server

const startServer = async () => {
	try {
		await initializeDatabase();

		const schema = await createSchema();

		if (!schema) {
			throw new Error('Schema not created');
		}

		const server = createApolloServer(schema);

		if (!server) {
			throw new Error('Server not created');
		}

		await setupMiddleware(server);

		await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
		console.log(`Server ready at http://localhost:${port}/graphql`);
	} catch (err: any) {
		console.error('Error starting server', err);
	}
};

// Start the Apollo Server and the HTTP Server
startServer();
