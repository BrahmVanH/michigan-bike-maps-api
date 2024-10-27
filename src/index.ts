import dotenv from 'dotenv';
import { readFileSync } from 'fs';

import { Resolvers, Track } from 'generated/graphql';

import { TrackResolver } from './lib/graphql/resolvers';
import { ApolloServer, BaseContext } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';
import express, { Request } from 'express';
import cors from 'cors';
import http from 'http';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { addMocksToSchema } from '@graphql-tools/mock';

import AppDataSource from './database/dataSource';

import TrackORM from './models/track';

import { GraphQLSchema } from 'graphql';
import { constraintDirective, constraintDirectiveTypeDefs } from 'graphql-constraint-directive';
import { rateLimitDirective } from 'graphql-rate-limit-directive';
import { buildSchema } from 'type-graphql';
import { CustomContext } from 'types/types';

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

const { rateLimitDirectiveTypeDefs, rateLimitDirectiveTransformer } = rateLimitDirective();

// let schema = makeExecutableSchema({
// 	typeDefs: [constraintDirectiveTypeDefs, rateLimitDirectiveTypeDefs, typeDefs],
// 	resolvers,
// });

// const typeDefs = readFileSync('../schema.graphql', 'utf-8');

const createSchema = async () => {
	try {
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

const createServer = (schema: GraphQLSchema) => {
	const server = new ApolloServer<CustomContext>({
		schema,
		introspection: true,
		plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
	});

	return server;
};

// Allow only specified origins to access the server

const allowedOrigins = process.env.CORS_ORIGINS?.split(',') || [];

// Start Apollo Server, Apply middleware to express app, including CORS and JSON parsing,
// allows server to use /graphql endpoint
// Add access-control-allow-credentials header to allow cookies to be sent to the server

const startApolloServer = async () => {
	try {
		const schema = await createSchema();
		if (!schema) {
			throw new Error('Schema not created');
		}

		const server = createServer(schema);

		if (!server) {
			throw new Error('Server not created');
		}

		await server.start();

		app.use(
			'/graphql',
			cors({ origin: allowedOrigins, credentials: true }),
			express.json(),
			expressMiddleware(server, {
				context: async () => ({ dataSource: AppDataSource }),
			})
		);
	} catch (err: any) {
		console.error('Error starting server', err);
	}
};

// Define how to start the http server on designated port

const startHttpServer = async () => {
	try {
		await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
		console.log(`🚀 Server ready at port: ${port}`);
	} catch (err: any) {
		console.error('Error starting server', err);
	}
};

// Start the Apollo Server and the HTTP Server
startApolloServer()
	.then(() => {
		startHttpServer();
	})
	.catch((err) => {
		console.error('Error starting server', err);
	});
