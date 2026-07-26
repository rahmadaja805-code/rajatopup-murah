import {
  getOrders,
  getProducts
} from "../services/database.js";

export async function dashboard(req, res) {
  const orders = await getOrders();

  res.render("admin/dashboard", {
    title: "Dashboard",
    orders
  });
}

export async function products(req, res) {
  const products = await getProducts();

  res.render("admin/products", {
    title: "Kelola Produk",
    products
  });
}
