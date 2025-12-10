const fs = require("fs");
const path = require("path");

// Define file contents

const appJsContent = `
// app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.send('Hello from app.js!');
});

app.post('/submit', (req, res) => {
  const data = req.body;
  res.json({ received: data });
});

module.exports = app;
`;

const serverJsContent = `
// server.js
require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(\` Server running on http://localhost:\${PORT}\`);
});
`;

// File paths
const appPath = path.join(process.cwd(), "app.js");
const serverPath = path.join(process.cwd(), "server.js");

// Create app.js
if (!fs.existsSync(appPath)) {
  fs.writeFileSync(appPath, appJsContent.trim());
  console.log("✅ app.js created");
} else {
  console.log("⚠ app.js already exists");
}

// Create server.js
if (!fs.existsSync(serverPath)) {
  fs.writeFileSync(serverPath, serverJsContent.trim());
  console.log("✅ server.js created");
} else {
  console.log("⚠ server.js already exists");
}

console.log("🚀 Server setup completed!");
