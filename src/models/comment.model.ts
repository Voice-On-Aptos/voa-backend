import { model, Schema } from "mongoose";
import { IMember } from "./member.model";

export interface IProps {
  content: string;
  author: IMember;
  applaud: Number;
  lentVoice: Number;
  type: string;
  parentId?: string;
}

const sharedSchemaFields = {
  content: { type: String, required: true },
  author: { type: String, required: true },
  applaud: { type: Number, default: 0 },
  lentVoice: { type: Number, default: 0 },
  type: { type: String, required: true, enum: ["comment", "reply"] }, // Differentiator
  parentId: { type: Schema.Types.ObjectId, ref: "Comment", required: false }, // Optional for replies
};

const CommentSchema = new Schema<IProps>(
  {
    ...sharedSchemaFields,
    type: { type: String, default: "comment" }, // Default type is 'Comment'
  },
  { timestamps: true }
);

const ReplySchema = new Schema<IProps>(
  {
    ...sharedSchemaFields,
    type: { type: String, default: "reply" }, // Default type is 'Reply'
  },
  { timestamps: true }
);

export const Comments = model<IProps>("Comment", CommentSchema);
export const Reply = model<IProps>("Reply", ReplySchema);
