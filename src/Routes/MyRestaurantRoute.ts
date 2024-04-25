import express from "express";
import MyRestaurantController from "../Controllers/MyRestaurantController";
import multer from "multer";
import { jwtCheck, jwtParse } from "../Middlewares/Auth";
import { validateMyRestaurantRequest } from "../Middlewares/Vallidation";
import myUserController from "../Controllers/myUserController";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1025,
  },
});

router.get(
  "/order",
  jwtCheck,
  jwtParse,
  MyRestaurantController.getMyrestaurantOrders
);

router.patch(
  "/order/:orderId/status",
  jwtCheck,
  jwtParse,
  MyRestaurantController.updateOrderStatus
);

router.get("/", jwtCheck, jwtParse, MyRestaurantController.getMyRestaurant);
router.post(
  "/",
  upload.single("imageFile"),
  validateMyRestaurantRequest,
  jwtCheck,
  jwtParse,
  MyRestaurantController.createMyRestaurant
);

router.put(
  "/",
  upload.single("imageFile"),
  validateMyRestaurantRequest,
  jwtCheck,
  jwtParse,
  MyRestaurantController.updateMyRestaurant
);

export default router;
