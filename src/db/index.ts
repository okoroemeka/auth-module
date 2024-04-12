import pg from 'pg'
const { Pool } = pg

const pool = new Pool(
    {
        user: 'postgres',
        host: 'localhost',
        database: 'authdb',
        password: 'password',
        port: 5432,
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
    }
)

export const query = (text:string, params:any) => pool.query(text, params)