import express from "express";
import {
  dashboard,
  products
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.redirect("/admin/dashboard");
});

router.get("/dashboard", dashboard);

router.get("/products", products);

export default router;
