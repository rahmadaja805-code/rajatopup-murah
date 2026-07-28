import { pool } from "./database/postgres.js";

const result = await pool.query(`
    SELECT
    invoice,
    customer_wa,
    game,
    product,
    status,
    created_at
    FROM orders
    ORDER BY created_at DESC
    LIMIT 10
`);

console.log(result.rows);

process.exit();
