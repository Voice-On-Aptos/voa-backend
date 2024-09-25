import { CommentController } from "./../controllers/comment.controller";
import express from "express";

const commentController = new CommentController();

const router = express.Router();

export default router;
