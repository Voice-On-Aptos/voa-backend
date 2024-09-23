import { UserService } from "../services/user.service";
import { UserController } from "./../controllers/user.controller";
import express from "express";

const userService = new UserService();
const userController = new UserController(userService);
const router = express.Router();

router.route("").get(userController.getProfile);

export default router;
