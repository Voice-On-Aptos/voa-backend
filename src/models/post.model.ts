import { model, Schema } from "mongoose";
import { IMember } from "./member.model";

interface IPost {
  author: IMember;
  content: string;
  images: string[];
}

const PostSchema = new Schema<IPost>(
  {
    author: { type: Schema.Types.ObjectId, required: true },
    content: { type: String, required: true },
    images: { type: [String], required: true },
  },
  {
    timestamps: true,
  }
);

export const Posts = model<IPost>("Post", PostSchema);
