#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { execSync } from "child_process";

console.log("🚀 Starting Full Express Server Setup...");

const cwd = process.cwd();
const packageJsonPath = path.join(cwd, "package.json");

// ======== Step 1: Initialize npm if package.json missing ========
if (!fs.existsSync(packageJsonPath)) {
  console.log("📦 Initializing npm project...");
  execSync("npm init -y", { stdio: "inherit" });
}

// ======== Step 2: Read & update package.json ========
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

// 🔥 IMPORTANT: force ESM
if (packageJson.type !== "module") {
  packageJson.type = "module";
  console.log("✅ package.json updated: type = module");
}

// ======== Step 3: Install dependencies ========
console.log("🔧 Installing dependencies: express, dotenv, cors...");
execSync("npm install express dotenv cors", { stdio: "inherit" });

// ======== Step 4: Install dev dependencies ========
console.log("🔧 Installing dev dependency: nodemon...");
execSync("npm install -D nodemon", { stdio: "inherit" });

// ======== Step 5: Create folder structure ========
const folders = [
  "controllers",
  "routes",
  "models",
  "middlewares",
  "config",
  "utils",
  "services"
];

folders.forEach(folder => {
  const folderPath = path.join(cwd, folder);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
    console.log(`📁 Created folder: ${folder}`);
  }
});

// ======== Step 6: Create app.js (ESM) ========
const appJsContent = `
import express from "express";
import cors from "cors";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sample route
app.get("/", (req, res) => {
  res.send("Hello from Express App!");
});

export default app;
`.trim();

if (!fs.existsSync(path.join(cwd, "app.js"))) {
  fs.writeFileSync("app.js", appJsContent);
  console.log("✅ app.js created");
}

// ======== Step 7: Create server.js (ESM) ========
const serverJsContent = `
import "dotenv/config";
import app from "./app.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(\`🚀 Server running on http://localhost:\${PORT}\`);
});
`.trim();

if (!fs.existsSync(path.join(cwd, "server.js"))) {
  fs.writeFileSync("server.js", serverJsContent);
  console.log("✅ server.js created");
}

// ======== Step 8: Update npm scripts ========
packageJson.scripts = packageJson.scripts || {};
packageJson.scripts.start = "node server.js";
packageJson.scripts.dev = "nodemon server.js";

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
console.log("✅ package.json scripts updated: start & dev");

// ======== Done ========
console.log("\n🎉 Full Express Server (ESM) setup complete!");
console.log("👉 Run: npm run dev");
