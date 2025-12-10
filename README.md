# Dev Genius Tools

<div align="center">
  <img alt="Dev Genius Tools" src="https://img.shields.io/badge/Dev%20Genius%20Tools-CLI%20Toolkit-blue" />
  <img alt="version" src="https://img.shields.io/badge/version-1.0.0-green" />
  <img alt="license" src="https://img.shields.io/badge/license-MIT-yellow" />
  <img alt="downloads" src="https://img.shields.io/npm/dt/dev-genius-tools" />
</div>

Short, fast CLI toolkit for generating snippets, scaffolding, and full Express apps — optimized for MERN workflows.

---

Table of contents

- Overview
- Features
- Install
- Quick start
- Commands & examples
- Project structure
- Snippets
- Configuration
- Contributing
- License
- Author & contact

## Overview

Dev Genius Tools speeds up repetitive tasks: generate components, models, routes, middleware or scaffold entire projects with simple commands.

## Features

- Generate code snippets: React, Express, Mongoose, hooks, middleware
- Full project scaffolding: folder generator, Express starter
- CLI-first: zero-config, fast execution, cross-platform
- Optional TypeScript output

## Installation

Prerequisites:

- Node.js >= 12
- npm or yarn

Install globally:

- npm:
  npm install -g dev-genius-tools
- yarn:
  yarn global add dev-genius-tools

Verify:
devgen --version

## Quick start

List snippets:
devgen list

Get a snippet:
devgen get react-component.js

Generate a project folder:
devgen gen-folder

Generate Express app:
devgen express-setup my-api-project

## Commands & examples

- List all snippets:
  devgen list

- Retrieve snippet:
  devgen get <snippet-name> [--output <dir>] [--name <CustomName>] [--typescript]

Examples:
devgen get react-component.js --output ./src/components --name UserProfile
devgen get mongodb-model.js --name Product --typescript

- Scaffold folder:
  devgen gen-folder --name my-project

- Full Express setup:
  devgen express-setup my-api-project

Use --help for command-specific options:
devgen get --help

## Generated project structure

Example output for gen-folder:

```
project-name/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── utils/
├── public/
├── tests/
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

Example express-setup:

```
my-api-project/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── app.js
├── .env
├── .gitignore
├── package.json
├── server.js
└── README.md
```

## Available snippets (high level)

Backend:

- express-api.js — CRUD routes & controller
- express-middleware.js — auth/logging middleware
- mongodb-model.js — Mongoose schema & model
- node-server.js — basic HTTP server
- jwt-auth.js — JWT auth starter
- error-handler.js — centralized error handler

Frontend:

- react-component.js — functional component template
- react-hook.js — custom hook
- react-context.js — context setup
- redux-slice.js — Redux Toolkit slice

Templates:

- full-express-app
- rest-api-template
- basic-crud-app

## Configuration

Create .env with:

```
NODE_ENV=development
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Package.json common scripts:

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest"
  }
}
```

## Contributing

Contributions welcome:

1. Fork repository
2. Create topic branch
3. Add tests where applicable
4. Open a PR with description and examples

To add a snippet:

- Create file in snippets/
- Follow naming conventions
- Add entry to snippets.json
- Include docs and examples

Report issues with steps to reproduce and expected vs actual behavior.

## FAQ

Q: Command 'devgen' not recognized?  
A: Ensure global install: npm install -g dev-genius-tools

Q: TypeScript support?  
A: Use --typescript flag when generating.

Q: How to add custom snippets?  
A: Add files to snippets/ and update snippets.json.

## License

MIT — see LICENSE for details.

## Author

Mubassir Ahmed Bappi — Lead Web Developer, SM Technology  
Contact: mubashirbappi@gmail.com



Happy Coding! 🚀
