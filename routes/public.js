import upload from "../middleware/upload.js";
import { auth } from "../middleware/auth.js";
import {
    profile,
    editProfile,
    updateProfile
} from "../controllers/authController.js";
import express from "express";
import {
  home,
  games,
  product,
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

router.get("/profile", auth, profile);

router.get("/profile/edit", auth, editProfile);

router.post(
    "/profile/edit",
    auth,
    upload.single("avatar"),
    updateProfile
);

export default router;
