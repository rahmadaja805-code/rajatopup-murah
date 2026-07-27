import { pool } from "../database/postgres.js";


// =====================
// PRODUCTS
// =====================

export async function getProducts() {

  const games = await pool.query(`
    SELECT *
    FROM games
    ORDER BY id
  `);

  const result = [];

  for (const game of games.rows) {

    const products = await pool.query(
      `
      SELECT name, price
      FROM products
      WHERE game_id=$1
      ORDER BY id
      `,
      [game.id]
    );


    result.push({
      id: game.id,
      slug: game.slug,
      name: game.name,
      image: game.image,
      zone: game.zone,
      products: products.rows
    });

  }

  return result;
}


// =====================
// ORDERS
// =====================

export async function getOrders(){

  const result = await pool.query(`
    SELECT
    id,
    invoice,
    game,
    product,
    user_id AS "userId",
    zone_id AS "zoneId",
    customer_wa AS "customerWa",
    status,
    created_at AS "createdAt"
    FROM orders
    ORDER BY id DESC
  `);

  return result.rows;

}


// =====================
// SAVE ORDER
// =====================

export async function saveOrder(order){

  await pool.query(
    `
    INSERT INTO orders
    (
      invoice,
      game,
      product,
      user_id,
      zone_id,
      customer_wa,
      status
    )
    VALUES
    ($1,$2,$3,$4,$5,$6,$7)
    `,
    [
      order.invoice,
      order.game,
      order.product,
      order.userId,
      order.zoneId,
      order.customerWa,
      order.status
    ]
  );

}


// =====================
// ADMINS
// =====================

export async function getAdmins(){

  const result = await pool.query(
    "SELECT * FROM admins"
  );

  return result.rows;

}


// =====================
// SETTINGS
// =====================

export async function getSettings(){

  const result = await pool.query(
    "SELECT * FROM settings"
  );

  return result.rows;

}

export async function saveOrders(data){

  for(const order of data){

    await pool.query(
      `
      INSERT INTO orders
      (
        invoice,
        game,
        product,
        user_id,
        zone_id,
        customer_wa,
        status
      )
      VALUES
      ($1,$2,$3,$4,$5,$6,$7)
      ON CONFLICT (invoice) DO NOTHING
      `,
      [
        order.invoice,
        order.game,
        order.product,
        order.userId,
        order.zoneId,
        order.customerWa,
        order.status
      ]
    );

  }

}

export async function updateOrderStatus(invoice, status){

  await pool.query(
    `
    UPDATE orders
    SET status=$1
    WHERE invoice=$2
    `,
    [
      status,
      invoice
    ]
  );

}

export async function createGame(data){

    const sql = `
        INSERT INTO games
        (
            name,
            slug,
            image
        )
        VALUES($1,$2,$3)
    `;

    await pool.query(sql,[
        data.name,
        data.slug,
        data.image
    ]);

}

// =====================
// GAME CRUD
// =====================

export async function getGameBySlug(slug){

    const result = await pool.query(
        `
        SELECT *
        FROM games
        WHERE slug=$1
        `,
        [slug]
    );

    return result.rows[0];

}


export async function updateGame(slug,data){

    await pool.query(
        `
        UPDATE games
        SET
        name=$1,
        image=$2
        WHERE slug=$3
        `,
        [
            data.name,
            data.image,
            slug
        ]
    );

}


export async function deleteGame(slug){

    await pool.query(
        `
        DELETE FROM games
        WHERE slug=$1
        `,
        [slug]
    );

}

// =====================
// PRODUCT CRUD
// =====================

export async function createProduct(data){

    await pool.query(
        `
        INSERT INTO products
        (
            game_id,
            name,
            price
        )
        VALUES($1,$2,$3)
        `,
        [
            data.game_id,
            data.name,
            data.price
        ]
    );

}


export async function getGameProducts(game_id){

    const result = await pool.query(
        `
        SELECT *
        FROM products
        WHERE game_id=$1
        ORDER BY id
        `,
        [game_id]
    );

    return result.rows;

}


export async function deleteProduct(id){

    await pool.query(
        `
        DELETE FROM products
        WHERE id=$1
        `,
        [id]
    );

}

export async function createManyProducts(products){

    for(const item of products){

        await pool.query(
            `
            INSERT INTO products
            (
                game_id,
                name,
                price
            )
            VALUES($1,$2,$3)
            `,
            [
                item.game_id,
                item.name,
                item.price
            ]
        );

    }

}

export async function getOrdersByWhatsapp(whatsapp){

    const result = await pool.query(
        `
        SELECT *
        FROM orders
        WHERE customer_wa=$1
        ORDER BY created_at DESC
        `,
        [whatsapp]
    );

    return result.rows;

}
