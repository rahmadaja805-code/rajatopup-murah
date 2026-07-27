import { getOrdersByWhatsapp } from "../services/database.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import {
  createUser,
  findUserByEmail,
  findUserById,
  updateUser
} from "../services/authService.js";

dotenv.config();

export async function register(req, res) {

  try {

    const {
      name,
      email,
      whatsapp,
      password
    } = req.body;

    if (
      !name ||
      !email ||
      !whatsapp ||
      !password
    ) {

      return res.render("register", {
        title: "Daftar",
        error: "Semua data wajib diisi."
      });

    }

    const user = await findUserByEmail(email);

    if (user) {

      return res.render("register", {
        title: "Daftar",
        error: "Email sudah digunakan."
      });

    }

    const hash = await bcrypt.hash(
      password,
      10
    );

    await createUser({
      name,
      email,
      whatsapp,
      password: hash
    });

    res.redirect("/login");

  } catch (err) {

    console.error(err);

    res.render("register", {
      title: "Daftar",
      error: "Terjadi kesalahan."
    });

  }

}

export async function login(req, res) {

  try {

    const {
      username,
      password
    } = req.body;

    // Login Admin

if (
  username === process.env.ADMIN_USERNAME &&
  password === process.env.ADMIN_PASSWORD
){

const token = jwt.sign(
{
    username: process.env.ADMIN_USERNAME,
    role: "admin"
},
process.env.JWT_SECRET,
{
    expiresIn: process.env.JWT_EXPIRES
});

res.cookie(
  "token",
  token,
  {
    httpOnly:true
  }
);

return res.redirect("/admin/dashboard");

}

    // Login User
const user = await findUserByEmail(username);

    if (!user) {

      return res.render("login", {
       title: "Login", 
       error: "Email atau password salah."
      });

    }

    const match =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!match) {

      return res.render("login", {
        title: "Login",
        error: "Email atau password salah."
      });

    }

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        role: "user"
      },
      process.env.JWT_SECRET,
      {
        expiresIn:
          process.env.JWT_EXPIRES
      }
    );

    res.cookie(
      "token",
      token,
      {
        httpOnly: true
      }
    );

    res.redirect("/");

  } catch (err) {

    console.error(err);

    res.render("login", {
      title: "Login",
      error: "Terjadi kesalahan."
    });

  }

}

export function logout(req, res) {

  res.clearCookie("token");

  res.redirect("/");

}

export async function profile(req,res){

    if(!req.user){
        return res.redirect("/login");
    }

    const user = await findUserById(req.user.id);

    const orders = await getOrdersByWhatsapp(
        user.whatsapp
    );

    res.render("profile",{
        title:"Profil Saya",
        user,
        orders
    });

}

export async function editProfile(req,res){

    res.render("edit-profile",{
        title:"Edit Profil",
        user: req.user
    });

}

export async function updateProfile(req,res){

    if(!req.user){
        return res.redirect("/login");
    }

    let avatar = req.user.avatar;

    if(req.file){
        avatar = "/uploads/avatar/" + req.file.filename;
    }

    await updateUser(req.user.id,{
        name:req.body.name,
        email:req.body.email,
        whatsapp:req.body.whatsapp,
        avatar
    });

    res.redirect("/profile");

}
