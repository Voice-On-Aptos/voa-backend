import express from "express";
import { PollController } from "../controllers/poll.controller";
import {
  userVerification,
  verifyIfUserIsInCommunity,
} from "../middlewares/authorization.middleware";

const pollController = new PollController();
const router = express.Router();

router.post(
  "/create",
  userVerification,
  verifyIfUserIsInCommunity,
  pollController.createPoll
);

router
  .route("/:id")
  .get(pollController.getPoll)
  .patch(userVerification, pollController.updatePoll)
  .delete(userVerification, pollController.deletePoll);

router.post("/:id/vote", pollController.voteOnPoll);
router.post("/:id/viewer/:userId", pollController.updateSeenByPoll);

export default router;
