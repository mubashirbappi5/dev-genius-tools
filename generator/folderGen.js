const fs = require("fs");

const folders = [
  "controllers",
  "models",
  "routes",
  "middlewares",
  "config",
  "utils",
  "services"
];

folders.forEach(folder => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
    console.log(`📁 Created: ${folder}`);
  } else {
    console.log(`⚠ Already exists: ${folder}`);
  }
});

console.log("🚀 Folder structure generated successfully!");
