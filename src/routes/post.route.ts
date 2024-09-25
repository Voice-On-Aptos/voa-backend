import express from "express";
import { CommentController } from "../controllers/comment.controller";
import { PostController } from "../controllers/post.controller";

const postController = new PostController();
const commentController = new CommentController();

const router = express.Router();

router.post("/create", postController.createPost);

router
  .route("/:id")
  .get(postController.getPost)
  .patch(postController.updatePost)
  .delete(postController.deletePost);

router.post("/:id/viewer/:userId", postController.updateSeenByPost);

router
  .route("/:id/comments")
  .get(commentController.getComments)
  .post(postController.commentOnPost);

router.post("/:id/applaud", postController.applaudPost);
router.post("/:id/lend-voice", postController.lendVoiceOnPost);

export default router;
