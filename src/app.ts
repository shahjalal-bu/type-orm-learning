import express, { Request, Response } from "express";
const app = express();
app.use(express.json());
const port = 2000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello From express");
});

app.listen(port, () => {
  console.log("Server is running on port 2000");
});
