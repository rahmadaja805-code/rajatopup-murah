import express from "express";
import {
  home,
  games,
  product
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", home);

router.get("/games", games);

router.get("/product/:slug", product);

router.get("/about", (req, res) => {
  res.render("about", {
    title: "Tentang Kami"
  });
});

export default router;
