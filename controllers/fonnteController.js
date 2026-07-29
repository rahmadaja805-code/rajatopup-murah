import {
    getLastOrder,
    checkExpired
} from "../services/orderService.js";
import { getIntent } from "../services/intent.js";
import { sendWhatsApp } from "../services/whatsappService.js";
import { handlePayment } from "../services/paymentService.js";

export async function handleWebhook(req, res) {

    try {

        const sender = req.body.sender;
        const pesan = (req.body.message || "").trim();

        console.log(req.body);

        const intent = getIntent(pesan);

        // Ambil order terakhir customer
const order = await getLastOrder(sender);

        // Jika belum ada order
        if (!order) {

            await sendWhatsApp(
                sender,
`❌ Pesanan tidak ditemukan.

Silakan lakukan pemesanan terlebih dahulu melalui RajaTopUp.`
            );

            return res.send("OK");

        }

const expired = await checkExpired(order);

if (expired) {

    await sendWhatsApp(
        sender,
`⏰ Invoice *${order.invoice}* telah kedaluwarsa.

Silakan checkout ulang untuk membuat transaksi baru.`
    );

    return res.send("OK");

}

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

await handlePayment(
    intent,
    sender,
    order,
    harga
);

return res.send("OK");

    } catch (err) {

        console.error(err);

        return res.status(500).send("Internal Server Error");

    }

}
