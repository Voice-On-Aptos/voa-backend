import express from "express";
import { deleteImage, uploadImage } from "../middlewares/imagekit.middleware";
import { UserController } from "./../controllers/user.controller";
import {
  addressAuthentication,
  userVerification,
} from "../middlewares/authorization.middleware";

const userController = new UserController();
const router = express.Router();

router.post("/create", addressAuthentication, userController.createProfile);

router
  .route("/:id")
  .get(userVerification, userController.getProfile)
  .put(userVerification, userController.updateProfile);

router.get(
  "/:id/communities",
  userVerification,
  userController.getUserCommunities
);
router.post(
  "/:id/communities/:communityId/join",
  userVerification,
  userController.joinCommunity
);
router.post(
  "/:id/communities/:communityId/leave",
  userVerification,
  userController.leaveCommunity
);

router.post("/:id/lend", userVerification, userController.lendVoice);
router.post("/:id/retract", userVerification, userController.retractVoice);

router
  .route("/:id/photo")
  .patch(userVerification, uploadImage, userController.updateProfilePhoto)
  .delete(userVerification, deleteImage, userController.deleteProfilePhoto);

export default router;
