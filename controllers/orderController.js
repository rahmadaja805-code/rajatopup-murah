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
