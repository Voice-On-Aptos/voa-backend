import { model, Schema } from "mongoose";
import { ICommunity } from "./community.model";
import { IUser } from "./user.model";

export interface IMember {
  community: ICommunity;
  user: IUser;
}

const MemberSchema = new Schema<IMember>(
  {
    community: { type: Schema.Types.ObjectId, ref: "Community" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

export const Members = model<IMember>("Member", MemberSchema);
