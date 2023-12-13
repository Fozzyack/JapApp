import { Pool } from 'pg'
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER || 'your_username',
  host: process.env.DB_HOST || 'your_host',
  database: process.env.DB_DATABASE || 'your_database',
  password: process.env.DB_PASSWORD || 'your_password',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export default pool;