import express from "express";
import { PollController } from "../controllers/poll.controller";

const pollController = new PollController();
const router = express.Router();

router.post("/create", pollController.createPoll);

router
  .route("/:id")
  .get(pollController.getPoll)
  .patch(pollController.updatePoll)
  .delete(pollController.deletePoll);

router.post("/:id/vote", pollController.voteOnPoll);
router.post("/:id/viewer/:userId", pollController.updateSeenByPoll);

export default router;
