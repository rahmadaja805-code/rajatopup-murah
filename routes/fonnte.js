import { getIntent } from "../services/intent.js";
import express from "express";
import { sendWhatsApp } from "../services/whatsappService.js";
import {
    getOrdersByWhatsapp,
    expireOrder
} from "../services/database.js";

const router = express.Router();

router.post("/webhook", async (req, res) => {

    const sender = req.body.sender;
    const pesan = (req.body.message || "").trim();

const intent = getIntent(pesan);

    console.log(req.body);

    // Ambil order terakhir customer
    const orders = await getOrdersByWhatsapp(sender);
    const order = orders[0];

    // Jika tidak ada order
    if (!order) {

        await sendWhatsApp(
            sender,
`❌ Pesanan tidak ditemukan.

Silakan lakukan pemesanan terlebih dahulu melalui RajaTopUp.`
        );

        return res.send("OK");

    }

    // Cek expired
    const sekarang = new Date();

    if (
        order.status === "MENUNGGU_PEMBAYARAN" &&
        order.expired_at &&
        sekarang > new Date(order.expired_at)
    ) {

        await expireOrder(order.invoice);

        await sendWhatsApp(
            sender,
`⏰ Invoice *${order.invoice}* telah kedaluwarsa.

Silakan checkout ulang untuk membuat transaksi baru.`
        );

        return res.send("OK");

    }

    // Status lain
    if (order.status === "EXPIRED") {

        await sendWhatsApp(
            sender,
            "❌ Invoice sudah kedaluwarsa. Silakan checkout ulang."
        );

        return res.send("OK");

    }

    if (order.status === "SELESAI") {

        await sendWhatsApp(
            sender,
            "✅ Pesanan ini sudah selesai."
        );

        return res.send("OK");

    }

    if (order.status === "DIBATALKAN") {

        await sendWhatsApp(
            sender,
            "❌ Pesanan telah dibatalkan."
        );

        return res.send("OK");

    }

    // Ambil harga
    const hargaText = order.product.match(/Rp([\d.]+)/);

    let harga = 0;

    if (hargaText) {

        harga = Number(
            hargaText[1].replace(/\./g, "")
        );

    }

    // DANA
    if (pesan === "1") {

        await sendWhatsApp(
            sender,
`💙 *Pembayaran DANA*

Invoice : ${order.invoice}

Game : ${order.game}

Produk : ${order.product}

Total Pembayaran :
Rp${harga.toLocaleString("id-ID")}

Nomor : 083172927610
Nama : Rahmad Rizki

Silakan transfer sesuai total pembayaran.

Setelah transfer kirim bukti pembayaran ya Kak 😊`
        );

    }

    // QRIS
    else if (pesan === "2") {

        const fee = Math.floor(harga * 0.007);
        const total = harga + fee;

        await sendWhatsApp(
            sender,
`📱 *Pembayaran QRIS*

Invoice : ${order.invoice}

Game : ${order.game}

Produk : ${order.product}

Harga Produk :
Rp${harga.toLocaleString("id-ID")}

Biaya QRIS (0,7%) :
Rp${fee.toLocaleString("id-ID")}

*Total Pembayaran :*
Rp${total.toLocaleString("id-ID")}

Silakan buka QRIS:

${process.env.APP_URL}/payment/qris.jpg

Setelah pembayaran berhasil kirim bukti pembayaran ya Kak 😊`
        );

    }

    // SeaBank
    else if (pesan === "3") {

        await sendWhatsApp(
            sender,
`🏦 *Pembayaran SeaBank*

Invoice : ${order.invoice}

Game : ${order.game}

Produk : ${order.product}

Total Pembayaran :
Rp${harga.toLocaleString("id-ID")}

Nomor Rekening : 901719133159
Nama : Nuraini

Silakan transfer sesuai total pembayaran.

Setelah transfer kirim bukti pembayaran ya Kak 😊`
        );

    }

    // Selain 1,2,3
    else {

        await sendWhatsApp(
            sender,
`❌ Pilihan tidak tersedia.

Balas:
1️⃣ DANA
2️⃣ QRIS
3️⃣ SeaBank`
        );

    }

    res.send("OK");

});

export default router;
