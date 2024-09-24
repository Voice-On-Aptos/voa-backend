import { Users } from "../models/user.model";
import AppError from "../utils/helpers/AppError";

export class UserService {
  public async getProfile(address?: string) {
    const user = await Users.findOne({ address });
    if (!user) throw new AppError(404, "User not found!");
    return user;
  }

  public async createProfile(payload: any) {
    this.verifyUsernameUniqueness(payload?.username);
    const user = new Users(payload);
    return await user.save();
  }

  public async updateProfile(_id: string, payload: any) {
    const { email, username, address, country } = payload;
    const user = await Users.findOne({ _id });
    if (!user) throw new AppError(404, "user not found");
    if (email) user.email = email;
    if (country) user.country = country;
    if (username) {
      this.verifyUsernameUniqueness(username);
      user.username = username;
    }

    if (address) {
      user.address = address;
    }
    const updatedUser = await user.save();
    return updatedUser;
  }

  public async updateProfilePhoto(
    fileUploaded: {
      url: string;
      id: string;
    },
    address: any
  ) {
    const user = await Users.findOne({ address });
    if (!user) throw new AppError(404, "user not found");
    if (fileUploaded) user.profilePhoto = fileUploaded;

    const updatedUser = await user.save();
    return updatedUser;
  }

  public async deleteProfilePhoto(address: any) {
    const user = await Users.findOne({ address });
    if (!user) throw new AppError(404, "user not found");
    user.profilePhoto = null;

    const updatedUser = await user.save();
    return updatedUser;
  }

  private async verifyUsernameUniqueness(username: string) {
    const user = await Users.findOne({ username });
    if (user) return new AppError(400, "Username already exists!");
    return true;
  }
}
