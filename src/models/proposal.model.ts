import { model, Schema } from "mongoose";
import { IMember } from "./member.model";

interface IProposal {
  title: string;
  description: string;
  options: string[];
  type: string;
  startDate: Date;
  endDate: Date;
  votes?: IMember[];
  seenBy?: IMember[];
  author: IMember;
}

const ProposalSchema = new Schema<IProposal>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    options: { type: [String], required: true },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    seenBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "Member",
      },
    ],
    votes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Member",
      },
    ],
    author: { type: Schema.Types.ObjectId, ref: "Member" },
  },
  {
    timestamps: true,
  }
);

export const Proposals = model<IProposal>("Proposal", ProposalSchema);
