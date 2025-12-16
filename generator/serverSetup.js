#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const cwd = process.cwd();
const packageJsonPath = path.join(cwd, "package.json");

// ===== Step 1: Ensure package.json =====
if (!fs.existsSync(packageJsonPath)) {
  console.log("📦 package.json not found. Initializing npm...");
  execSync("npm init -y", { stdio: "inherit" });
}

// ===== Step 2: Ensure ESM =====
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

if (packageJson.type !== "module") {
  packageJson.type = "module";
  console.log("✅ package.json updated: type = module");
}

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

// ===== Step 3: app.js content =====
const appJsContent = `
// app.js
import express from "express";
import cors from "cors";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.send("Hello from app.js!");
});

app.post("/submit", (req, res) => {
  const data = req.body;
  res.json({ received: data });
});

export default app;
`.trim();

// ===== Step 4: server.js content =====
const serverJsContent = `
// server.js
import "dotenv/config";
import app from "./app.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(\`🚀 Server running on http://localhost:\${PORT}\`);
});
`.trim();

// ===== Step 5: Write files safely =====
const appPath = path.join(cwd, "app.js");
const serverPath = path.join(cwd, "server.js");

if (!fs.existsSync(appPath)) {
  fs.writeFileSync(appPath, appJsContent);
  console.log("✅ app.js created");
} else {
  console.log("⚠ app.js already exists");
}

if (!fs.existsSync(serverPath)) {
  fs.writeFileSync(serverPath, serverJsContent);
  console.log("✅ server.js created");
} else {
  console.log("⚠ server.js already exists");
}

// ===== Done =====
console.log("\n🎉 ESM Server setup completed!");
console.log("👉 Make sure you installed: express cors dotenv");
console.log("👉 Run: node server.js");
