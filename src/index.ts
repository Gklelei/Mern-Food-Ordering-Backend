import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./Routes/myUserRoute";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => {
  console.log("DB connected Succecifully");
});

const app = express();
const PORT = process.env.PORT || 7000;
app.use(express.json());
app.use(cors());

app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "Health is ok!" });
});
app.use("/api/my/user", myUserRoute);

app.listen(PORT, () => {
  console.log(`SERVER LISTENING AT PORT ${PORT}`);
});
