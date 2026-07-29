import { sendWhatsApp } from "./whatsappService.js";
import {
    danaMessage,
    qrisMessage,
    seabankMessage
} from "../messages/paymentMessages.js";

export async function handlePayment(intent, sender, order, harga) {

    switch (intent) {

        case "DANA":

            await sendWhatsApp(
                sender,
                danaMessage(order, harga)
            );

            break;

        case "QRIS":

            const fee = Math.floor(harga * 0.007);
            const total = harga + fee;

            await sendWhatsApp(
                sender,
                qrisMessage(
                    order,
                    harga,
                    fee,
                    total,
                    process.env.APP_URL
                )
            );

            break;

        case "SEABANK":

            await sendWhatsApp(
                sender,
                seabankMessage(order, harga)
            );

            break;

        default:

            await sendWhatsApp(
                sender,
`❌ Pilihan tidak tersedia.

Balas:
1️⃣ DANA
2️⃣ QRIS
3️⃣ SeaBank`
            );

    }

}
