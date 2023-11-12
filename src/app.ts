import express, { Request, Response } from "express";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
require("dotenv").config();
const app = express();
app.use(express.json());
const port = 2000;
const AppDataSource = new DataSource({
  type: "postgres",
  host: "hansken.db.elephantsql.com",
  port: 5432,
  username: "nfdvsart",
  password: process.env.DB_PASS,
  database: "nfdvsart",
  entities: ["src/entities/*{.ts,.js}"],
  synchronize: true,
  logging: true,
});
const userRepo = AppDataSource.getRepository(User);
//get user
app.get("/", async (req: Request, res: Response) => {
  const users = await userRepo.find();
  res.json(users);
});
//get a user
app.get("/:id", async (req: Request, res: Response) => {
  const id: number = +req.params.id;
  const users = await userRepo.findOne({ where: { id: id } });
  res.json(users);
});
//post user
app.post("/", async (req: Request, res: Response) => {
  const body: User = req.body;
  const user = await userRepo.save(body);
  res.json(user);
});
//delete user
app.delete("/:id", async (req: Request, res: Response) => {
  const id: number = +req.params.id;
  const user = await userRepo.delete(id);
  res.json(user);
});

//update a user
app.put("/:id", async (req: Request, res: Response) => {
  const id: number = +req.params.id;
  const body: User = req.body;
  const user = await userRepo.update(id, body);
  res.json(user);
});

AppDataSource.initialize()
  .then(() => {
    console.log("Database connect success");
    app.listen(port, () => {
      console.log("Server is running on port 2000");
    });
  })
  .catch((err) => console.log("Error ", err));
