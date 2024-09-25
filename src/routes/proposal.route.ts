import express from "express";
import { CommentController } from "../controllers/comment.controller";
import { ProposalController } from "../controllers/proposal.controller";

const proposalController = new ProposalController();
const commentController = new CommentController();

const router = express.Router();

router.post("/create", proposalController.createProposal);

router
  .route("/:id")
  .get(proposalController.getProposal)
  .patch(proposalController.updateProposal)
  .delete(proposalController.deleteProposal);

router.post("/:id/vote", proposalController.voteOnProposal);
router.post("/:id/viewer/:userId", proposalController.updateSeenByProposal);

router
  .route("/:id/comments")
  .get(commentController.getComments)
  .post(proposalController.commentOnProposal);

export default router;
