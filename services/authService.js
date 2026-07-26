import { pool } from "../database/postgres.js";

export async function findUserByEmail(email) {

  const result = await pool.query(
    `
    SELECT *
    FROM users
    WHERE email=$1
    LIMIT 1
    `,
    [email]
  );

  return result.rows[0];

}

export async function createUser(user){

  const result = await pool.query(
    `
    INSERT INTO users
    (
      name,
      email,
      whatsapp,
      password
    )
    VALUES
    ($1,$2,$3,$4)
    RETURNING *
    `,
    [
      user.name,
      user.email,
      user.whatsapp,
      user.password
    ]
  );

  return result.rows[0];

}

export async function findUserById(id){

  const result = await pool.query(
    `
    SELECT
      id,
      name,
      email,
      whatsapp,
      created_at
    FROM users
    WHERE id=$1
    `,
    [id]
  );

  return result.rows[0];

}
