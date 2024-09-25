import { model, Schema } from "mongoose";
import { ICommunity } from "./community.model";

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
  communities: ICommunity[];
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true },
    address: { type: String, unique: true },
    country: { type: String, required: true },
    profilePhoto: {
      url: { type: String },
      id: { type: String },
    },
    username: { type: String, unique: true, sparse: true, required: true },
    fcmToken: { type: String },
    communities: [{ type: Schema.Types.ObjectId, ref: "Community" }],
  },
  {
    timestamps: true,
  }
);

export const User = model<IUser>("User", UserSchema);
