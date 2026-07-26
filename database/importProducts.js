import fs from "fs/promises";
import { pool } from "./postgres.js";

const products = JSON.parse(
  await fs.readFile(
    "./database/products.json",
    "utf8"
  )
);

async function importData() {
  try {

    for (const game of products) {

      const gameResult = await pool.query(
        `
        INSERT INTO games
        (slug, name, image, zone)
        VALUES ($1,$2,$3,$4)
        ON CONFLICT (slug)
        DO UPDATE SET
        name = EXCLUDED.name,
        image = EXCLUDED.image,
        zone = EXCLUDED.zone
        RETURNING id
        `,
        [
          game.slug,
          game.name,
          game.image,
          game.zone
        ]
      );

      const gameId = gameResult.rows[0].id;


      for (const item of game.products) {

        await pool.query(
          `
          INSERT INTO products
          (game_id,name,price)
          VALUES ($1,$2,$3)
          `,
          [
            gameId,
            item.name,
            item.price
          ]
        );

      }

      console.log(
        "Imported:",
        game.name
      );
    }


    console.log(
      "✅ Semua produk berhasil masuk PostgreSQL"
    );

    process.exit();

  } catch (err) {

    console.error(err);
    process.exit(1);

  }
}


importData();
