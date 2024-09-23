import { Response } from "express";
import { UserService } from "../services/user.service";
import AppError from "../utils/helpers/AppError";
import { ExtendedRequest } from "../utils/interfaces";

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  public async getProfile(request: ExtendedRequest, response: Response) {
    const { address } = request;
    try {
      const user = await this.userService.getProfile(address);
      return response.status(200).json(user);
    } catch (error: any) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json(error.message);
      }
      return response.status(500).json(error.message);
    }
  }
}
