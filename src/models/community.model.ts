import { model, Schema } from "mongoose";
import { IUser } from "./user.model";

interface IProps {
  minimum_voice_power: number;
  minimum_voice_age: number;
}

const PropSchema = new Schema<IProps>(
  {
    minimum_voice_power: { type: Number, require: true },
    minimum_voice_age: { type: Number, require: true },
  },
  { _id: false }
);

export interface ICommunity {
  name: string;
  description: string;
  token_address: string;
  creator: IUser;
  twitter: string;
  website: string;
  criterias: string[];
  logo: string;
  banner: string;
  voice_power_rate: number;
  minimum_voice_power_required_to_join: number;
  post: IProps;
  comment: IProps;
  proposal: IProps;
  poll: IProps;
  token_to_distribute: number;
  distribution_date: Date;
}

const CommunitySchema = new Schema<ICommunity>(
  {
    name: {
      type: String,
      required: true,
    },
    banner: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    token_address: {
      type: String,
      required: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    twitter: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
    criterias: {
      type: [String],
      required: true,
    },
    post: {
      type: PropSchema,
    },
    comment: {
      type: PropSchema,
    },
    proposal: {
      type: PropSchema,
    },
    poll: {
      type: PropSchema,
    },
    distribution_date: {
      type: Date,
      required: true,
    },
    minimum_voice_power_required_to_join: {
      type: Number,
      required: true,
    },
    token_to_distribute: {
      type: Number,
      required: true,
    },
    voice_power_rate: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Communities = model<ICommunity>("Community", CommunitySchema);
