const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

console.log("🚀 Starting Full Express Server Setup...");

// ======== Step 1: Initialize npm if package.json missing ========
if (!fs.existsSync(path.join(process.cwd(), "package.json"))) {
  console.log("📦 Initializing npm project...");
  execSync("npm init -y", { stdio: "inherit" });
}

// ======== Step 2: Install dependencies ========
console.log("🔧 Installing dependencies: express, dotenv, cors, body-parser...");
execSync("npm install express dotenv cors body-parser", { stdio: "inherit" });

console.log("🔧 Installing dev dependency: nodemon...");
execSync("npm install -D nodemon", { stdio: "inherit" });

// ======== Step 3: Create folder structure ========
const folders = ["controllers", "routes", "models", "middlewares", "config", "utils", "services"];
folders.forEach(folder => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
    console.log(`📁 Created folder: ${folder}`);
  }
});

// ======== Step 4: Create app.js ========
const appJsContent = `
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Sample route
app.get('/', (req, res) => {
  res.send('Hello from Express App!');
});

module.exports = app;
`.trim();

if (!fs.existsSync("app.js")) {
  fs.writeFileSync("app.js", appJsContent);
  console.log("✅ app.js created");
}

// ======== Step 5: Create server.js ========
const serverJsContent = `
require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(\`🚀 Server running on http://localhost:\${PORT}\`);
});
`.trim();

if (!fs.existsSync("server.js")) {
  fs.writeFileSync("server.js", serverJsContent);
  console.log("✅ server.js created");
}

// ======== Step 6: Update package.json for nodemon ========
const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
packageJson.scripts = packageJson.scripts || {};
packageJson.scripts.start = "node server.js";
packageJson.scripts.dev = "nodemon server.js";
fs.writeFileSync("package.json", JSON.stringify(packageJson, null, 2));
console.log("✅ package.json scripts updated: start & dev");

// ======== Done ========
console.log("🎉 Full Express Server setup complete!");
console.log("Run 'npm run dev' to start server with nodemon.");
