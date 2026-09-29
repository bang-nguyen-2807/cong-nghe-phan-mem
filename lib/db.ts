import { Pool , PoolConfig } from "pg";
const config : PoolConfig = {
    user: "postgres",
    password: "123456",
    host: "localhost",
    port: 5432,
    database: "CongNghePhanMem",
}
let pool: Pool | null = null;

export async function connnectDB() {
  if (!pool) {
    pool = new Pool(config);
  }

  return pool;
}

export default pool;