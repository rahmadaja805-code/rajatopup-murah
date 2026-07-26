import { getOrders, saveOrders } from "../services/database.js";
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

    if (!game || !product || !userId || !customerWa) {
      return res.status(400).json({
        success: false,
        message: "Data belum lengkap."
      });
    }

    const orders = await getOrders();

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

    orders.unshift(order);

    await saveOrders(orders);

    res.json({
      success: true,
      order
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan server."
    });
  }
}
