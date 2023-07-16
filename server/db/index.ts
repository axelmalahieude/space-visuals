import 'dotenv/config';
import { Pool, PoolClient, QueryResult } from 'pg';

/**
 * Configure the pool of clients that we can use for one-shot queries.
 */
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

/**
 * Execute a one-shot query on the first available client from the pool.
 * @param text Query to execute.
 * @param params Any parameters to the query.
 * @returns A promise that resolves to the query results.
 */
export const query = async (text: string, params: Array<any>): Promise<QueryResult<any>> => {
  const start = Date.now();
  console.log('executing query', { text, params })
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log('query results', { duration, numberRows: res.rowCount });
  return res;
}

/**
 * Get an actual client to the database on which to execute queries.
 * @returns A promise that resolves to a database client.
 */
export const getClient = async (): Promise<PoolClient> => {
  return pool.connect();
}