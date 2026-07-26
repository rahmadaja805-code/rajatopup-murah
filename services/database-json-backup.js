import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const databasePath = path.join(__dirname, "../database");

async function read(file) {
  try {
    const data = await fs.readFile(
      path.join(databasePath, file),
      "utf8"
    );

    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function write(file, data) {
  await fs.writeFile(
    path.join(databasePath, file),
    JSON.stringify(data, null, 2),
    "utf8"
  );
}

export async function getProducts() {
  return await read("products.json");
}

export async function getAdmins() {
  return await read("admins.json");
}

export async function getOrders() {
  return await read("orders.json");
}

export async function getSettings() {
  return await read("settings.json");
}

export async function saveOrders(data) {
  return await write("orders.json", data);
}

export async function saveProducts(data) {
  return await write("products.json", data);
}

export async function saveSettings(data) {
  return await write("settings.json", data);
}
