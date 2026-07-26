import express from "express";
import {
  dashboard,
  products,
updateStatus
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.redirect("/admin/dashboard");
});

router.get("/dashboard", dashboard);

router.get("/products", products);

router.post("/order/status", updateStatus);

export default router;
