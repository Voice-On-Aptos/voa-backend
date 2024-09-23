import { model, Schema } from "mongoose";

export interface IUser {
  address: string;
  country: string;
  profilePhoto: string;
  username: string;
  fcmToken?: string;
}

const UserSchema = new Schema<IUser>(
  {
    address: { type: String },
    country: { type: String },
    profilePhoto: { type: String },
    username: { type: String, unique: true, sparse: true },
    fcmToken: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Users = model<IUser>("User", UserSchema);
