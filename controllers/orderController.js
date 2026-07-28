import { sendWhatsApp } from "../services/whatsappService.js";
import { saveOrder } from "../services/database.js";
import crypto from "crypto";


export async function createOrder(req, res) {

  try {

    const {
      game,
      product,
      userId,
      zoneId,
      customerWa
    } = req.body;


    // cek data wajib
    if (!game || !product || !userId || !customerWa) {

      return res.status(400).json({
        success: false,
        message: "Data belum lengkap."
      });

    }


    // buat data order baru
    const order = {

      id: crypto.randomUUID(),

      invoice: "RT" + Date.now(),

      game,

      product,

      userId,

      zoneId: zoneId || "",

      customerWa,

      status: "MENUNGGU_PEMBAYARAN",

      createdAt: new Date().toISOString()

    };


    // simpan langsung ke PostgreSQL
    await saveOrder(order);

// kirim pesan ke pembeli
const customerMessage = `Halo Kak 👋

Pesanan RajaTopUp sudah dibuat ✅

Invoice : ${order.invoice}

🎮 Game : ${order.game}
📦 Produk : ${order.product}

🆔 User ID : ${order.userId}
Zone ID : ${order.zoneId || "-"}

Silakan pilih metode pembayaran:

1️⃣ DANA
2️⃣ QRIS
3️⃣ SeaBank

Balas angka sesuai metode pembayaran.

Terima kasih 🙏

👑 RajaTopUp
Fast • Secure • Trusted`;


await sendWhatsApp(
  order.customerWa,
  customerMessage
);


// kirim notifikasi admin kedua
const adminMessage = `🔔 PESANAN BARU RAJATOPUP

Invoice : ${order.invoice}

🎮 Game : ${order.game}
📦 Produk : ${order.product}

🆔 User ID : ${order.userId}
Zone ID : ${order.zoneId || "-"}

📱 WA Pembeli : ${order.customerWa}

Status:
MENUNGGU PEMBAYARAN`;


await sendWhatsApp(
  process.env.FONNTE_ADMIN_WA,
  adminMessage
);

    return res.json({

      success: true,

      message: "Order berhasil dibuat",

      order

    });



  } catch (err) {


    console.error("ORDER ERROR:", err);


    return res.status(500).json({

      success: false,

      message: "Terjadi kesalahan server."

    });


  }

}
