import apiRoutes from "./routes/api.js";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import publicRoutes from "./routes/public.js";
import adminRoutes from "./routes/admin.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.locals.appName = process.env.APP_NAME;
app.locals.storeWhatsapp = process.env.STORE_WHATSAPP;

app.use(helmet({
  contentSecurityPolicy: false
}));

app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "public")));

app.use("/", publicRoutes);
app.use("/api", apiRoutes);
app.use("/admin", adminRoutes);

app.get("/health", (req, res) => {
  res.json({
    success: true,
    app: process.env.APP_NAME,
    status: "online",
    time: new Date()
  });
});

app.use((req, res) => {
  res.status(404).send("404 | Halaman tidak ditemukan");
});

app.listen(PORT, () => {
  console.log("=================================");
  console.log(`${process.env.APP_NAME} berjalan`);
  console.log(`URL : http://localhost:${PORT}`);
  console.log("=================================");
});
