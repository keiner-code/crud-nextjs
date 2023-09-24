import {Pool, PoolConfig} from 'pg';

let conn: Pool | undefined;

if(!conn){
  const poolConfig: PoolConfig = {connectionString: process.env.DATABASE_URL}
  conn = new Pool(poolConfig);
}

export {conn};