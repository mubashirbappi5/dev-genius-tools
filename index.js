#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);

if (args.length === 0) {
  console.log(`
Usage:
  devgen list
  devgen get <snippet-name>
  devgen gen-folder
`);
  process.exit(0);
}

// list snippets
if (args[0] === "list") {
  const snippetPath = path.join(__dirname, "snippets");
  const files = fs.readdirSync(snippetPath);
  console.log("Available snippets:");
  files.forEach(f => console.log(" - " + f));
  process.exit(0);
}

// get snippet
if (args[0] === "get") {
  const name = args[1];
  if (!name) return console.log("❌ Provide a snippet name");

  const filePath = path.join(__dirname, "snippets", name);
  if (!fs.existsSync(filePath)) {
    return console.log("❌ Snippet not found");
  }

  const content = fs.readFileSync(filePath, "utf8");
  fs.writeFileSync(name, content);
  console.log(`✅ Snippet created: ${name}`);
  process.exit(0);
}

// generate folders
if (args[0] === "gen-folder") {
  require(path.join(__dirname, "generator", "folderGen.js"));
  process.exit(0);
}

console.log("❌ Invalid command. Run `devgen` for help.");
