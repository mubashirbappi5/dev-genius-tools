#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";



// version 
function getVersion() {
  const pkgPath = path.join(__dirname, "package.json");

  if (!fs.existsSync(pkgPath)) {
    return "unknown";
  }

  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
  return pkg.version || "unknown";
}





// ---------- ESM compatibility ----------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---------- CLI args ----------
const args = process.argv.slice(2);

const snippetsDir = path.join(__dirname, "snippets");
const generatorDir = path.join(__dirname, "generator");

// ---------- Helper: dynamic ESM import (Windows safe) ----------
async function runGenerator(fileName) {
  const modulePath = path.join(generatorDir, fileName);

  if (!fs.existsSync(modulePath)) {
    console.error(`❌ File not found: ${fileName}`);
    process.exit(1);
  }

  try {
    // 🔥 CRITICAL FIX FOR WINDOWS
    const moduleURL = pathToFileURL(modulePath).href;
    await import(moduleURL);
    process.exit(0);
  } catch (err) {
    console.error("❌ Failed to run generator:");
    console.error(err.message);
    process.exit(1);
  }
}


// version display

if (args.includes("--version") || args.includes("-v")) {
  console.log(`dev-genius-tools v${getVersion()}`);
  process.exit(0);
}


// ---------- Usage ----------
function showUsage() {
  console.log(`
Dev Genius Tools 🚀

Usage:
  devgen list
  devgen get <snippet-name>
  devgen gen-folder
  devgen server-setup
  devgen full-server-setup
  devgen init
`);
  process.exit(0);
}

// ---------- Main ----------
if (args.length === 0) {
  showUsage();
}

switch (args[0]) {
  case "list": {
    if (!fs.existsSync(snippetsDir)) {
      console.error("❌ Snippets folder not found");
      process.exit(1);
    }

    const files = fs.readdirSync(snippetsDir);
    if (files.length === 0) {
      console.log("⚠ No snippets available");
    } else {
      console.log("Available snippets:");
      files.forEach(f => console.log(" - " + f));
    }
    process.exit(0);
  }

  case "get": {
    const name = args[1];
    if (!name) {
      console.error("❌ Provide a snippet name");
      process.exit(1);
    }

    const filePath = path.join(snippetsDir, name);
    if (!fs.existsSync(filePath)) {
      console.error("❌ Snippet not found");
      process.exit(1);
    }

    const destPath = path.join(process.cwd(), name);
    fs.writeFileSync(destPath, fs.readFileSync(filePath, "utf8"));
    console.log(`✅ Snippet created: ${name}`);
    process.exit(0);
  }

  case "gen-folder":
    await runGenerator("folderGen.js");
    break;

  case "server-setup":
    await runGenerator("serverSetup.js");
    break;

  case "full-server-setup":
    await runGenerator("fullExpressSetup.js");
    break;

  case "init":
    await runGenerator("interactiveInit.js");
    break;

  default:
    console.error("❌ Invalid command.");
    showUsage();
}
