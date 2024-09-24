import express from "express";
import { deleteImage, uploadImage } from "../middlewares/imagekit.middleware";
import { UserController } from "./../controllers/user.controller";

const userController = new UserController();
const router = express.Router();

router
  .route("")
  .get(userController.getProfile)
  .put(userController.updateProfile);

router.post("/create", userController.createProfile);

router.patch("/photo", uploadImage, userController.updateProfilePhoto);

router.delete("/photo", deleteImage, userController.deleteProfilePhoto);

export default router;
