import { model, Schema } from "mongoose";
import { IMember } from "./member.model";

interface IPoll {
  question: string;
  options: string[];
  votes?: IMember[];
  author: IMember;
}

const PollSchema = new Schema<IPoll>(
  {
    question: { type: String, required: true },
    options: { type: [String], required: true },
    votes: {
      types: Schema.Types.ObjectId,
      ref: "Member",
    },
    author: { type: Schema.Types.ObjectId, required: true },
  },
  {
    timestamps: true,
  }
);

export const Polls = model<IPoll>("Poll", PollSchema);
