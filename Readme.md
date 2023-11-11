Setting up an Express application with TypeScript involves a few steps to configure the environment, install necessary dependencies, and define the project structure. Here's a basic guide to get you started:

### 1: Initialize Your Project

Initialize a new project using npm or yarn.

```bash
# Create a new directory for your project

mkdir typeorm-learning

# Navigate into the directory
cd typeorm-learning

# Initialize a new npm package
npm init -y
```

### 2: Install Dependencies

Install the necessary packages: Express, TypeScript, and other related libraries.

```bash
# TypeScript install globally
npm install -g typescript

# TypeScript related packages
npm install --save-dev ts-node @types/node @types/express

# Express
npm install express

# Nodemon
npm install nodemon --save-dev
```

### 3: Initialize tsconfig.json

```bash
 tsc --init
```

### 4: Configure TypeScript

Edit `tsconfig.json` file to set up TypeScript configurations:

```json
// tsconfig.json
{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist",
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

### Step 4: Project Structure

Create your project structure. You can organize it as you see fit, but here's a basic structure:

```
typeorm-learning
├── src
|   ├── index.ts
└── tsconfig.json
```

### Step 5: Writing Express Code in TypeScript

#### `src/index.ts`

```typescript
import express, { Request, Response } from "express";
const app = express();
app.use(express.json());
const port = 2000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello From express");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

### Step 6: Running the Application

#### Open `package.json` and Update with scripts to run the application:

```json
"scripts": {
  "start:dev": "nodemon ./src/app.ts",
  "build": "tsc -p .",
  "start:prod": "node ./dist/app.js"
}
```

### Step 7: Build and Run

# To start the application in development:

```bash
npm run start:dev

```

This will watch for changes in your TypeScript files and restart the server automatically.

# To build the application ts to js

```bash
npm run build

```

# To start the application in production after build:

```bash
npm run start:prod

```