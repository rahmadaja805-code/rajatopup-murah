import express from "express";
import { sendWhatsApp, sendImage } from "../services/whatsappService.js";

const router = express.Router();

router.post("/webhook", async (req, res) => {

    const sender = req.body.sender;
    const pesan = (req.body.message || "").trim();

    console.log(req.body);

    if (pesan === "1") {

        await sendWhatsApp(sender,
`💙 *Pembayaran DANA*

Nomor : 083172927610
Nama : Rahmad Rizki

Silakan transfer sesuai harga produk.
Setelah transfer kirim bukti pembayaran ya Kak 😊`);

    }

    else if (pesan === "2") {

        await sendImage(
            sender,
            `${process.env.APP_URL}/payment/qris.jpg`,
`📱 *Pembayaran QRIS*

Silakan scan QRIS di atas.

Biaya layanan QRIS sebesar *0,7%* akan ditambahkan ke total pembayaran.

Setelah pembayaran berhasil, kirim bukti transfer ya Kak 😊`
        );

    }

    else if (pesan === "3") {

        await sendWhatsApp(sender,
`🏦 *Pembayaran SeaBank*

Nomor Rekening : 901719133159
Nama : Nuraini

Silakan transfer sesuai harga produk.
Setelah transfer kirim bukti pembayaran ya Kak 😊`);

    }

    res.send("OK");

});

export default router;
