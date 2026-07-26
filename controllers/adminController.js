import { sendWhatsApp } from "../services/whatsappService.js";

import {
  getOrders,
  getProducts,
  updateOrderStatus
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


export async function updateStatus(req,res){

console.log("STATUS UPDATE:", req.body);

  const {
    invoice,
    status
  } = req.body;


  await updateOrderStatus(
    invoice,
    status
  );

if(status === "SELESAI"){

    const orders = await getOrders();

    const order = orders.find(
      o => o.invoice === invoice
    );


    if(order){

await sendWhatsApp(
  order.customerWa,
`👑 RAJATOPUP

━━━━━━━━━━━━━━
✅ TRANSAKSI SELESAI
━━━━━━━━━━━━━━

📄 Invoice:
${order.invoice}

🎮 Game:
${order.game}

💎 Produk:
${order.product}

🆔 ID Player:
${order.userId}

📌 Status:
BERHASIL DIPROSES

━━━━━━━━━━━━━━

Terima kasih sudah melakukan top up di RajaTopUp 🙏

⚡ Cepat • Aman • Terpercaya`
);

    }

  }

  res.redirect("/admin/dashboard");

}
