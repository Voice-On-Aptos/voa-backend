import express from "express";
import { deleteImage, uploadImage } from "../middlewares/imagekit.middleware";
import { UserController } from "./../controllers/user.controller";

const userController = new UserController();
const router = express.Router();

router.post("/create", userController.createProfile);

router
  .route("/:id")
  .get(userController.getProfile)
  .put(userController.updateProfile);

router.get("/:id/communities", userController.getUserCommunities);
router.post("/:id/communities/:communityId/join", userController.joinCommunity);
router.post(
  "/:id/communities/:communityId/leave",
  userController.leaveCommunity
);

router.post("/:id/lend", userController.lendVoice);
router.post("/:id/retract", userController.retractVoice);

router
  .route("/:id/photo")
  .patch(uploadImage, userController.updateProfilePhoto)
  .delete(deleteImage, userController.deleteProfilePhoto);

export default router;
