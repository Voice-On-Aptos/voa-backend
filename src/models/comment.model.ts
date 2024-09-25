import { model, Schema } from "mongoose";
import { IUser } from "./user.model";

export interface IProps {
  content: string;
  author: IUser;
  applauds: IUser[];
  lentVoices: { by: IUser; amount: number }[];
}

export interface IComment extends IProps {
  parentId: string;
  type: "post" | "proposal";
  replies: IProps[];
}

const sharedSchemaFields = {
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  applauds: [
    {
      type: Schema.Types.ObjectId,
      ref: "UserIUser",
    },
  ],
  lentVoices: [
    {
      by: {
        type: Schema.Types.ObjectId,
        ref: "UserIUser",
      },
      amount: { type: Number },
    },
  ],
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

export const Comment = model<IComment>("Comment", CommentSchema);

// Discriminator for Post Comments
export const PostComment = Comment.discriminator(
  "PostComment",
  new Schema({ parentId: { type: Schema.Types.ObjectId, ref: "post" } })
);

// Discriminator for Proposal Comments
export const ProposalComment = Comment.discriminator(
  "ProposalComment",
  new Schema({ parentId: { type: Schema.Types.ObjectId, ref: "proposal" } })
);

// // Discriminator for Poll Comments
// export const PollComment = Comment.discriminator(
//   "PollComment",
//   new Schema({ parentId: { type: Schema.Types.ObjectId, ref: "poll" } })
// );
