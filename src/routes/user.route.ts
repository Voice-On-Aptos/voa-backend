import { UserController } from "./../controllers/user.controller";
import express from "express";

const userController = new UserController();
const router = express.Router();

router
  .route("")
  .get(userController.getProfile)
  .put(userController.updateProfile);

router.post("/create", userController.createProfile);

export default router;
