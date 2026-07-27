import upload from "../middleware/upload.js";
import express from "express";
import { adminOnly } from "../middleware/auth.js";

import {
  getProducts,
  createGame,
  updateGame,
  deleteGame,
  getGameBySlug
} from "../services/database.js";

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

router.get("/games", async (req, res) => {

    const games = await getProducts();

    res.render("admin/games", {
        title: "Kelola Game",
        games
    });

});

router.get("/games/add", (req, res) => {

    res.render("admin/add-game", {
        title: "Tambah Game"
    });

});

router.post(
"/games/add",
upload.single("image"),
async(req,res)=>{

    const {
        name,
        slug,
        image
    } = req.body;

await createGame({

    name: req.body.name,

    slug: req.body.slug,

    image: req.file
    ? "/images/games/" + req.file.filename
    : "/images/games/logo.png"

});

    res.redirect("/admin/games");

});

// =====================
// EDIT GAME FORM
// =====================

router.get("/games/edit/:slug", async(req,res)=>{

    const games = await getProducts();

    const game = games.find(
        g => g.slug === req.params.slug
    );


    res.render("admin/edit-game",{
        title:"Edit Game",
        game
    });

});


// =====================
// UPDATE GAME
// =====================

router.post(
"/games/edit/:slug",
upload.single("image"),
async(req,res)=>{


await updateGame(
    req.params.slug,
    {
        name:req.body.name,
        image:req.file
        ? "/images/games/"+req.file.filename
        : req.body.oldImage
    }
);


res.redirect("/admin/games");

});



// =====================
// DELETE GAME
// =====================

router.get(
"/games/delete/:slug",
async(req,res)=>{


await deleteGame(
    req.params.slug
);


res.redirect("/admin/games");


});

router.get("/games/edit/:slug", async(req,res)=>{

    const game = await getGameBySlug(
        req.params.slug
    );


    res.render("admin/edit-game",{
        title:"Edit Game",
        game
    });

});

export default router;
