import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./Routes/myUserRoute";
import { v2 as cloudinary } from "cloudinary";
import RestaurantRoute from "./Routes/RestaurantRoute";
import MyRestaurantRoute from "./Routes/MyRestaurantRoute";
import OrderRoute from "./Routes/OrderRoute";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => {
  console.log("DB connected Succecifully");
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const PORT = process.env.PORT || 7000;

app.use(cors());

app.use("/api/order/checkout/webhook", express.raw({ type: "*/*" }));

app.use(express.json());

app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "Health is ok!" });
});
app.use("/api/my/user", myUserRoute);
app.use("/api/my/restaurant", MyRestaurantRoute);
app.use("/api/restaurant", RestaurantRoute);
app.use("/api/order", OrderRoute);

app.listen(PORT, () => {
  console.log(`SERVER LISTENING AT PORT ${PORT}`);
});
