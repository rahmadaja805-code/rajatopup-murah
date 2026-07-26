import { pool } from "./database/postgres.js";

const result = await pool.query(
  "SELECT NOW()"
);

console.log(result.rows);

process.exit();
