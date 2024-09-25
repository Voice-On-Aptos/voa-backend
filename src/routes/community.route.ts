import express from "express";
import { CommunityController } from "../controllers/community.controller";

const communityController = new CommunityController();

const router = express.Router();

router.get("", communityController.getCommunities);

router.post("/create", communityController.createCommunity);

router
  .route("/:id")
  .get(communityController.getCommunity)
  .put(communityController.updateCommunity)
  .delete(communityController.deleteCommunity);

router.get("/:id/statistics", communityController.getCommunityStats);

router.get("/:id/members", communityController.getCommunityMembers);

//proposals endpoints
router.get("/:id/proposals", communityController.getCommunityProposals);

router.get("/:id/posts", communityController.getCommunityPosts);

router.get("/:id/polls", communityController.getCommunityPolls);

export default router;
