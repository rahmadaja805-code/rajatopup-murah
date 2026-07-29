import {
    getOrdersByWhatsapp,
    expireOrder
} from "./database.js";

export async function getLastOrder(sender) {

    const orders = await getOrdersByWhatsapp(sender);

    return orders[0] || null;

}

export async function checkExpired(order) {

    if (!order) return false;

    if (
        order.status === "MENUNGGU_PEMBAYARAN" &&
        order.expired_at &&
        new Date() > new Date(order.expired_at)
    ) {

        await expireOrder(order.invoice);

        order.status = "EXPIRED";

        return true;

    }

    return false;

}
