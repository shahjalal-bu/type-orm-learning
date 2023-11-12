import express, { Request, Response } from "express";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Profile } from "./entities/Profile";
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
  // logging: true,
});
const userRepo = AppDataSource.getRepository(User);
const profileRepo = AppDataSource.getRepository(Profile);
//get user
// app.get("/", async (req: Request, res: Response) => {
//   const users = await userRepo.find();
//   res.json(users);
// });
//get a user
// app.get("/:id", async (req: Request, res: Response) => {
//   const id: number = +req.params.id;
//   const users = await userRepo.findOne({ where: { id: id } });
//   res.json(users);
// });
// //post user
// app.post("/", async (req: Request, res: Response) => {
//   const body: User = req.body;
//   const user = await userRepo.save(body);
//   res.json(user);
// });
// //delete user
// app.delete("/:id", async (req: Request, res: Response) => {
//   const id: number = +req.params.id;
//   const user = await userRepo.delete(id);
//   res.json(user);
// });

// //update a user
// app.put("/:id", async (req: Request, res: Response) => {
//   const id: number = +req.params.id;
//   const body: User = req.body;
//   const user = await userRepo.update(id, body);
//   res.json(user);
// });

// //insert user with profile
// app.post("/user-with-profile", async (req: Request, res: Response) => {
//   const { gender, photo, email, firstName, lastName } = req.body as Profile &
//     User;
//   //post for profile
//   let profile: Profile = new Profile();
//   profile.gender = gender;
//   profile.photo = photo;

//   const insertProfile = await profileRepo.save(profile);
//   //post for user
//   let user: User = new User();
//   user.email = email;
//   user.firstName = firstName;
//   user.lastName = lastName;
//   user.profile = insertProfile;
//   const userInsert = await userRepo.save(user);
//   res.json(userInsert);
// });
// //insert user with profile with cascade
app.post("/user-with-profile-cascade", async (req: Request, res: Response) => {
  const { gender, photo, email, firstName, lastName } = req.body as Profile &
    User;
  //post for profile
  let profile: Profile = new Profile();
  profile.gender = gender;
  profile.photo = photo;

  // const insertProfile = await profileRepo.save(profile);
  //post for user
  let user: User = new User();
  user.email = email;
  user.firstName = firstName;
  user.lastName = lastName;
  // user.profile = insertProfile;
  user.profile = profile;
  const userInsert = await userRepo.save(user);
  res.json(userInsert);
});

// //user with profile
// app.get("/", async (req: Request, res: Response) => {
//   const users = await userRepo.find({ relations: { profile: true } });
//   res.json(users);
// });
//relation with profile with eager
app.get("/", async (req: Request, res: Response) => {
  const users = await userRepo.find();
  res.json(users);
});

// app.put("/:id", async (req: Request, res: Response) => {
//   const { email, firstName, lastName, gender, photo } = req.body as User &
//     Profile;
//   let user = await userRepo.findOne({ where: { id: +req.params.id } });
//   if (user) {
//     user.email = email;
//     user.firstName = firstName;
//     user.lastName = lastName;
//     user.profile.gender = gender;
//     user.profile.photo = photo;
//     const updatedUser = await userRepo.save(user);
//     res.json(updatedUser);
//   } else {
//     res.json("User not found");
//   }
// });

//delete profile automatically delete user
app.delete("/p/:id", async (req: Request, res: Response) => {
  const id: number = +req.params.id;
  const profile = await profileRepo.delete(id);
  res.json(profile);
});

//delete user
app.delete("/:id", async (req: Request, res: Response) => {
  const id: number = +req.params.id;
  const user = await userRepo.delete(id);
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
