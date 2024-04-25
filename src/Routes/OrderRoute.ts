import express from "express";
import { jwtCheck, jwtParse } from "../Middlewares/Auth";
import OrderController from "../Controllers/OrderController";

const router = express.Router();
router.get("/", jwtCheck, jwtParse, OrderController.getMyOrders);
router.post(
  "/checkout/create-checkout-session",
  jwtCheck,
  jwtParse,
  OrderController.createCheckOutSession
);
router.post("/checkout/webhook", OrderController.stripeWebhookHandler);
export default router;
