import express from "express";

const router = express.Router();

router.get("/webhook", (req, res) => {
    res.send("Webhook Fonnte Aktif ✅");
});

router.post("/webhook", (req, res) => {
    console.log("=== WEBHOOK FONNTE ===");
    console.log(req.body);

    res.status(200).json({
        success: true
    });
});

export default router;
