import { Community } from "../models/community.model";
import { Poll } from "../models/poll.model";
import { Post } from "../models/post.model";
import { Proposal } from "../models/proposal.model";
import AppError from "../utils/helpers/AppError";
import { paginateModel } from "../utils/helpers/PaginationHelper";

//get communities
//get community by id
//update community by id, (banner, logo, d)
//delete community
//join community
//leave community
//get community stats

//get user engagement

export class CommunityService {
  public async getCommunities(page: number = 1, limit: number = 100) {
    const query = {};
    const communities = await paginateModel(Community, query, page, limit);
    return communities;
  }

  public async createCommunity(payload: any) {
    const community = new Community(payload);
    await community.save();
    return community;
  }

  public async updateCommunity(_id: string, payload: any) {
    const community = await Community.findOneAndUpdate({ _id }, payload, {
      new: true,
    });
    if (!community) {
      throw new AppError(404, "Community not found");
    }
    return community;
  }

  public async getCommunity(_id: string) {
    const community = await Community.findOne({ _id });
    if (!community) throw new AppError(404, "Community not found");
    return community;
  }

  public async deleteCommunity(_id: string) {
    const community = await Community.findOneAndDelete({ _id });
    if (!community) {
      throw new AppError(404, "Community not found");
    }
    return "Community has been deleted successfully";
  }

  public async getCommunityMembers(_id: string) {
    const members = await Community.find({ _id }).populate("members");
    return members;
  }

  public async getCommunityProposals(_id: string) {
    const proposals = await Proposal.find({ community: _id });
    return proposals;
  }

  public async getCommunityPosts(_id: string) {
    const posts = await Post.find({ community: _id });
    return posts;
  }

  public async getCommunityPolls(_id: string) {
    const polls = await Poll.find({ community: _id });
    return polls;
  }

  public async getCommunityStats(_id: string) {
    const community = await Community.findById(_id);
    if (!community) throw new AppError(404, "Community not found");
    const totalPosts = await Post.countDocuments({ community: _id });
    const totalPolls = await Poll.countDocuments({ community: _id });
    const totalMembers = community.members.length;
    const totalProposals = await Proposal.countDocuments({ community: _id });
    return {
      totalPosts,
      totalPolls,
      totalMembers,
      totalProposals,
    };
  }

  //user engagement on community
}
