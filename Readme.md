Setting up TypeORM with PostgreSQL and ElephantSQL involves creating an ElephantSQL database, configuring TypeORM to connect to the database, and using TypeORM to interact with the database. Here's a step-by-step guide:

1. **Create an ElephantSQL Database**

   - Create an account on ElephantSQL (https://elephantsql.com/) if you don't have one already.
   - Create a new database instance.
   - Take note of the database connection details, including the host, port, username, password, and database name.

2. **Install TypeORM and PostgreSQL Driver**
   - Open your project directory in a terminal.
   - Install TypeORM, reflect-metadata and the PostgreSQL driver:

```bash
npm install typeorm reflect-metadata pg
```

3. **Configure TypeORM in app.ts**

```typescript
import express, { Request, Response } from "express";
import "reflect-metadata"; //import reflect
import { DataSource } from "typeorm"; //import typeorm
const app = express();
app.use(express.json());
const port = 2000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello From express");
});

const AppDataSource = new DataSource({
  type: "postgres",
  host: "hansken.db.elephantsql.com",
  port: 5432,
  username: "nfdvsart",
  password: "", // put password form elephantsql
  database: "nfdvsart",
});

AppDataSource.initialize()
  .then(() => {
    console.log("Database connect success");
    app.listen(port, () => {
      console.log("Server is running on port 2000");
    });
  })
  .catch((err) => console.log("Error ", err));
```
