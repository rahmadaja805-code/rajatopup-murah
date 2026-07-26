import express from "express";
import {
  register,
  login,
  logout
} from "../controllers/authController.js";

const router = express.Router();

// Halaman
router.get("/login", (req, res) => {
  res.render("login", {
    title: "Login",
    error: null
  });
});

router.get("/register", (req, res) => {
  res.render("register", {
    title: "Daftar",
    error: null
  });
});

// Proses
router.post("/login", login);
router.post("/register", register);

router.get("/logout", logout);

export default router;
