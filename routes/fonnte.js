import express from "express";

const router = express.Router();

router.post("/webhook", (req, res) => {

    console.log("=== WEBHOOK FONNTE ===");
    console.log(req.body);

    res.status(200).json({
        success: true
    });

});

export default router;
