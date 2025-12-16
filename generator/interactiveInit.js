const inquirer = require("inquirer");
const { execSync } = require("child_process");
const fs = require("fs");

(async () => {
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "projectType",
      message: "Project type?",
      choices: ["Express API", "MERN Backend"]
    },
    {
      type: "confirm",
      name: "useMongo",
      message: "Use MongoDB?",
      default: true
    },
    {
      type: "confirm",
      name: "useDotenv",
      message: "Use dotenv?",
      default: true
    },
    {
      type: "confirm",
      name: "useTS",
      message: "Use TypeScript?",
      default: false
    },
    {
      type: "list",
      name: "pkgManager",
      message: "Package manager?",
      choices: ["npm", "yarn", "pnpm"]
    },
    {
      type: "input",
      name: "port",
      message: "Port number?",
      default: "3000"
    },
    {
      type: "confirm",
      name: "autoStart",
      message: "Auto start server?",
      default: true
    }
  ]);

  console.log("\n🚀 Setting up project...\n");

  // Create basic files
  fs.writeFileSync("app.js", `const express = require("express");
const app = express();
app.use(express.json());
app.get("/", (req, res) => res.send("Server Running"));
module.exports = app;
`);

  fs.writeFileSync("server.js", `const app = require("./app");
const PORT = process.env.PORT || ${answers.port};
app.listen(PORT, () => console.log("Server running on port " + PORT));
`);

  if (answers.useDotenv) {
    fs.writeFileSync(".env", `PORT=${answers.port}`);
  }

  // Install deps
  execSync(`${answers.pkgManager} install express`, { stdio: "inherit" });

  if (answers.autoStart) {
    execSync("node server.js", { stdio: "inherit" });
  }

  console.log("\n✅ Project ready & live locally!");
})();
