import { getProducts } from "../services/database.js";

export async function home(req, res) {
  const products = await getProducts();

  res.render("home", {
    title: "Home",
    products
  });
}

export async function games(req, res) {
  const products = await getProducts();

  res.render("games", {
    title: "Daftar Game",
    products
  });
}

export async function product(req, res) {
  const products = await getProducts();

  const game = products.find(
    item => item.slug === req.params.slug
  );

  if (!game) {
    return res.status(404).send("Produk tidak ditemukan");
  }

  res.render("product", {
    title: game.name,
    game
  });
}
