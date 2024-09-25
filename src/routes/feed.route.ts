import express from "express";
import { FeedController } from "../controllers/feed.controller";

const feedController = new FeedController();
const router = express.Router();

router.get("", feedController.getFeed);

export default router;
