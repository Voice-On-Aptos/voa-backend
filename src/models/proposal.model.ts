import { model, Schema } from "mongoose";
import { ICommunity } from "./community.model";
import { IUser } from "./user.model";

interface IProposal {
  title: string;
  description: string;
  options: string[];
  type: string;
  startDate: Date;
  endDate: Date;
  votes: { by: IUser; vote: string }[];
  seenBy: IUser[];
  author: IUser;
  community: ICommunity;
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
        ref: "User",
      },
    ],
    votes: [
      {
        by: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        vote: { type: String, required: true },
      },
    ],
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    community: {
      type: Schema.Types.ObjectId,
      ref: "Community",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Proposal = model<IProposal>("Proposal", ProposalSchema);
