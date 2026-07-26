import express from "express";
import { adminOnly } from "../middleware/auth.js";
import {
  dashboard,
  products,
  updateStatus
} from "../controllers/adminController.js";

const router = express.Router();

router.use(adminOnly);

router.get("/", (req, res) => {
  res.redirect("/admin/dashboard");
});

router.get("/dashboard", dashboard);

router.get("/products", products);

router.post("/order/status", updateStatus);

export default router;
