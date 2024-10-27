import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

import TrackORM from '@/models/track';

dotenv.config();

const host = process.env.POSTGRES_HOST ?? 'localhost';
const username = process.env.POSTGRES_USER ?? '';
const password = process.env.POSTGRES_PASSWORD ?? '';
const database = process.env.POSTGRES_DB ?? '';
const port = parseInt(process.env.POSTGRES_PORT ?? '') ?? 5432;

const AppDataSource = new DataSource({
	host,
	username,
	password,
	database,
	port,
	logging: true,
	entities: [TrackORM],
	type: 'postgres',
	synchronize: true,
});

export default AppDataSource;
