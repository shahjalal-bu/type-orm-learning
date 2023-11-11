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
});

AppDataSource.initialize()
  .then(() => {
    console.log("Database connect success");
    app.listen(port, () => {
      console.log("Server is running on port 2000");
    });
  })
  .catch((err) => console.log("Error ", err));
