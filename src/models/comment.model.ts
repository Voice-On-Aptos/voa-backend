import { model, Schema } from "mongoose";
import { IMember } from "./member.model";
export interface IProps {
  content: string;
  author: IMember;
  applaud: Number;
  lentVoice: Number;
}

export interface IComment extends IProps {
  parentId: string;
  type: "post" | "proposal";
  replies: IProps[];
}

const sharedSchemaFields = {
  content: { type: String, required: true },
  author: { type: String, required: true },
  applaud: { type: Number, default: 0 },
  lentVoice: { type: Number, default: 0 },
};

const ReplySchema = new Schema<IProps>(
  {
    ...sharedSchemaFields,
  },
  { timestamps: true }
);

const CommentSchema = new Schema<IComment>(
  {
    ...sharedSchemaFields,
    parentId: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: ["post", "proposal"], // Discriminator key
    },
    replies: {
      type: [ReplySchema],
    },
  },
  { timestamps: true }
);

export const Comments = model<IComment>("Comment", CommentSchema);

// Discriminator for Post Comments
export const PostComment = Comments.discriminator(
  "PostComment",
  new Schema({ targetId: { type: Schema.Types.ObjectId, ref: "post" } })
);

// Discriminator for Proposal Comments
export const ProposalComment = Comments.discriminator(
  "ProposalComment",
  new Schema({ targetId: { type: Schema.Types.ObjectId, ref: "proposal" } })
);

// // Discriminator for Poll Comments
// export const PollComment = Comments.discriminator(
//   "PollComment",
//   new Schema({ targetId: { type: Schema.Types.ObjectId, ref: "poll" } })
// );
