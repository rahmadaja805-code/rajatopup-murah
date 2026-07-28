import express from "express";

const router = express.Router();

router.all("/webhook", (req, res) => {

    console.log("===== FONNTE WEBHOOK =====");
    console.log("METHOD:", req.method);
    console.log("HEADERS:", req.headers);
    console.log("BODY:", req.body);

    res.status(200).send("OK");

});

export default router;
