#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { select, confirm, input } from "@inquirer/prompts";

console.log("\n🚀 Dev Genius – Interactive Project Setup\n");

const projectType = await select({
  message: "Project type?",
  choices: [
    { name: "Express API", value: "express" },
    { name: "MERN Backend", value: "mern" }
  ]
});

const useMongo = await confirm({
  message: "Use MongoDB?",
  default: true
});

const useDotenv = await confirm({
  message: "Use dotenv?",
  default: true
});

const pkgManager = await select({
  message: "Package manager?",
  choices: [
    { name: "npm", value: "npm" },
    { name: "yarn", value: "yarn" },
    { name: "pnpm", value: "pnpm" }
  ]
});

const port = await input({
  message: "Port number?",
  default: "3000"
});

const autoStart = await confirm({
  message: "Auto start server (nodemon)?",
  default: true
});

const root = process.cwd();
const src = path.join(root, "src");

// 📁 Create folders
["src", "src/routes", "src/controllers", "src/models"].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// 📄 app.js
fs.writeFileSync(
  path.join(src, "app.js"),
`import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 Dev Genius Server Running");
});

export default app;
`
);

// 📄 server.js
fs.writeFileSync(
  path.join(src, "server.js"),
`import app from "./app.js";

const PORT = process.env.PORT || ${port};

app.listen(PORT, () => {
  console.log("🔥 Server running on port " + PORT);
});
`
);

// 🌱 .env
if (useDotenv) fs.writeFileSync(".env", `PORT=${port}\n`);

console.log("\n📦 Installing dependencies...\n");

let installCmd = "";
let runCmd = "";

if (pkgManager === "npm") {
  installCmd = "npm install express dotenv cors";
  if (useMongo) installCmd += " mongoose";
  installCmd += " && npm install -D nodemon";
  runCmd = "npx nodemon src/server.js";
} else if (pkgManager === "yarn") {
  installCmd = "yarn add express dotenv cors";
  if (useMongo) installCmd += " mongoose";
  installCmd += " && yarn add -D nodemon";
  runCmd = "yarn nodemon src/server.js";
} else {
  installCmd = "pnpm add express dotenv cors";
  if (useMongo) installCmd += " mongoose";
  installCmd += " && pnpm add -D nodemon";
  runCmd = "pnpm nodemon src/server.js";
}

execSync(installCmd, { stdio: "inherit" });

console.log("\n✅ Project setup complete!");

if (autoStart) {
  console.log("\n🚀 Starting server...\n");
  execSync(runCmd, { stdio: "inherit" });
} else {
  console.log("\n👉 Run manually: nodemon src/server.js");
}
