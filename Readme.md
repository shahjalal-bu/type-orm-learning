"strictPropertyInitialization": false,

To create and connect a TypeORM entity and connect to app

**1. Create your Entity Classes:**

Define entity classes to represent your database tables. These classes should be decorated with the `@Entity()` decorator and include properties for each column in the table. For example, to create an entity class for a `User` table:
**entities/User.ts**

```typescript
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column()
  email: string;
}
```

**2. Configure tsconfig.json:**
Disabling `strictPropertyInitialization` because it lead to errors if you attempt to use a property before it has been initialized. Therefore, it's generally recommended to keep this option enabled unless you have a specific reason to disable it.

```bash
  "strictPropertyInitialization": false,
```

**3. Connect entries to app:**

In your `app.ts` file, establish a connection of entries

```typescript
import express, { Request, Response } from "express";
import "reflect-metadata";
import { DataSource } from "typeorm";
require("dotenv").config();
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
  password: process.env.DB_PASS,
  database: "nfdvsart",
  entities: ["src/entities/*{.ts,.js}"], //import all entries
  synchronize: true, //so that if entries change automatically database change
  logging: true, //console useful log of query
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
