import { model, Schema } from "mongoose";

export interface IUser {
  email: string;
  address: string;
  country: string;
  profilePhoto?: {
    url: string;
    id: string;
  } | null;
  username: string;
  fcmToken?: string;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String },
    address: { type: String, unique: true },
    country: { type: String },
    profilePhoto: { ulr: { type: String }, id: { type: String } },
    username: { type: String, unique: true, sparse: true },
    fcmToken: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Users = model<IUser>("User", UserSchema);
