#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);

// ======== Snippets Path ========
const snippetsDir = path.join(__dirname, "snippets");
const generatorDir = path.join(__dirname, "generator");

// ======== Commands ========
if (args.length === 0) {
  console.log(`
Usage:
  devgen list
  devgen get <snippet-name>
  devgen gen-folder
`);
  process.exit(0);
}

// ======== List Snippets ========
if (args[0] === "list") {
  if (!fs.existsSync(snippetsDir)) {
    console.log("❌ Snippets folder not found!");
    process.exit(1);
  }
  const files = fs.readdirSync(snippetsDir);
  console.log("Available snippets:");
  files.forEach(f => console.log(" - " + f));
  process.exit(0);
}

// ======== Get Snippet ========
if (args[0] === "get") {
  const name = args[1];
  if (!name) return console.log("❌ Provide a snippet name");

  const filePath = path.join(snippetsDir, name);
  if (!fs.existsSync(filePath)) {
    return console.log("❌ Snippet not found");
  }

  const content = fs.readFileSync(filePath, "utf8");

  // Write snippet to current working directory
  const destPath = path.join(process.cwd(), name);
  if (fs.existsSync(destPath)) {
    console.log("⚠ File already exists in current folder");
    process.exit(1);
  }

  fs.writeFileSync(destPath, content);
  console.log(`✅ Snippet created: ${name}`);
  process.exit(0);
}

// ======== Generate Folder ========
if (args[0] === "gen-folder") {
  const folderGenPath = path.join(generatorDir, "folderGen.js");
  if (!fs.existsSync(folderGenPath)) {
    console.log("❌ folderGen.js not found in generator folder!");
    process.exit(1);
  }
  require(folderGenPath);
  process.exit(0);
}


if (args[0] === "server-setup") {
  const serverSetupPath = path.join(generatorDir, "serverSetup.js");
  if (!fs.existsSync(serverSetupPath)) {
    console.log("❌ serverSetup.js not found in generator folder!");
    process.exit(1);
  }
  require(serverSetupPath);
  process.exit(0);
}


//// full server setup 


if (args[0] === "full-server-setup") {
  const setupPath = path.join(generatorDir, "fullExpressSetup.js");
  if (!fs.existsSync(setupPath)) {
    console.log("❌ fullExpressSetup.js not found in generator folder!");
    process.exit(1);
  }
  require(setupPath);
  process.exit(0);
}

//========= Interactive Init ========
if (args[0] === "init") {
  const initPath = path.join(generatorDir, "interactiveInit.js");
  if (!fs.existsSync(initPath)) {
    console.log("❌ interactiveInit.js not found!");
    process.exit(1);
  }
  require(initPath);
  process.exit(0);
}



// ======== Invalid Command ========
console.log("❌ Invalid command. Run `devgen` for help.");
