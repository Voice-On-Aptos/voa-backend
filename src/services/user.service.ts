import { Users } from "../models/user.model";
import AppError from "../utils/helpers/AppError";

export class UserService {
  public async getProfile(address?: string) {
    const user = await Users.findOne({ address });
    if (!user) throw new AppError(404, "User not found!");
    return user;
  }
}
