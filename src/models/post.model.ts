import { model, Schema } from "mongoose";
import { IMember } from "./member.model";

interface IPost {
  author: IMember;
  seenBy?: IMember[];
  content: string;
  images: string[];
  applaud: { type: Number; default: 0 };
  lentVoice: { type: Number; default: 0 };
}

const PostSchema = new Schema<IPost>(
  {
    applaud: { type: Number, default: 0 },
    lentVoice: { type: Number, default: 0 },
    author: { type: Schema.Types.ObjectId, ref: "Member" },
    seenBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "Member",
      },
    ],
    content: { type: String, required: true },
    images: { type: [String], required: true },
  },
  {
    timestamps: true,
  }
);

export const Posts = model<IPost>("Post", PostSchema);
