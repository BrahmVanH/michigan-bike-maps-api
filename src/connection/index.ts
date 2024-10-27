import { Pool } from 'pg';

const connect = async () => {
	const host = process.env.POSTGRES_HOST ?? 'localhost';
	const user = process.env.POSTGRES_USER ?? '';
	const password = process.env.POSTGRES_PASSWORD ?? '';
	const database = process.env.POSTGRES_DB ?? '';
	const port = parseInt(process.env.POSTGRES_PORT ?? '') ?? 5432;
	const pool = new Pool({
		host,
		user,
		password,
		database,
		port,
		idleTimeoutMillis: 30000,
	});

	return pool;
};

export default connect;
