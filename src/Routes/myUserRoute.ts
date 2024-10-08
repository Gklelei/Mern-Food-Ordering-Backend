import express from "express";
import myUserController from "../Controllers/myUserController";
import { jwtCheck, jwtParse } from "../Middlewares/Auth";
import { validateMyUserRequest } from "../Middlewares/Vallidation";
import { get } from "http";

const router = express.Router();
router.get("/", jwtCheck, jwtParse, myUserController.getCurrentUser);
router.post("/", jwtCheck, myUserController.createCurrentUser);
router.put(
  "/",
  jwtCheck,
  jwtParse,
  validateMyUserRequest,
  myUserController.updateCurrentUser
);
export default router;
