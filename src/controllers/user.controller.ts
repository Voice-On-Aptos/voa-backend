import { Response } from "express";
import { UserService } from "../services/user.service";
import AppError from "../utils/helpers/AppError";
import { ExtendedRequest } from "../utils/interfaces";

const userService = new UserService();
export class UserController {
  public async getProfile(request: ExtendedRequest, response: Response) {
    const { address } = request;
    try {
      const user = await userService.getProfile(address);
      return response.status(200).json(user);
    } catch (error: any) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json(error.message);
      }
      return response.status(500).json(error.message);
    }
  }

  public async createProfile(request: ExtendedRequest, response: Response) {
    const { email, address, country, username } = request.body;
    try {
      const user = await userService.createProfile({
        email,
        address,
        country,
        username,
      });
      return response.status(201).json(user);
    } catch (error: any) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json(error.message);
      }
      return response.status(500).json(error.message);
    }
  }

  public async updateProfile(request: ExtendedRequest, response: Response) {
    const { _id, email, address, country, username } = request.body;
    try {
      const user = await userService.updateProfile(_id, {
        email,
        address,
        country,
        username,
      });
      return response.status(200).json(user);
    } catch (error: any) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json(error.message);
      }
      return response.status(500).json(error.message);
    }
  }

  public async updateProfilePhoto(
    request: ExtendedRequest,
    response: Response
  ) {
    const { _id } = request.body;
    try {
      const user = await userService.updateProfile(_id, {});
      return response.status(200).json(user);
    } catch (error: any) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json(error.message);
      }
      return response.status(500).json(error.message);
    }
  }
}
