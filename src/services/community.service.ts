import { Community } from "../models/community.model";
import { Poll } from "../models/poll.model";
import { Post } from "../models/post.model";
import { Proposal } from "../models/proposal.model";
import AppError from "../utils/helpers/AppError";
import { paginateModel } from "../utils/helpers/PaginationHelper";

export class CommunityService {
  public async getCommunities(page: number = 1, limit: number = 30) {
    const query = {};
    const communities = await paginateModel(Community, query, page, limit, {}, [
      "creator",
      "address",
    ]);
    return communities;
  }

  public async getNewCommunities(page: number = 1, limit: number = 30) {
    const query = {};
    const sort = { createdAt: -1 };
    const communities = await paginateModel(
      Community,
      query,
      page,
      limit,
      sort,
      ["creator", "address"]
    );
    return communities;
  }

  public async getPopularCommunities(page: number = 1, limit: number = 30) {
    const query = { members: { $size: { $gt: 50 } } };
    const sort = { members: -1 };
    const communities = await paginateModel(
      Community,
      query,
      page,
      limit,
      sort,
      ["creator", "address"]
    );
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
    const community = await Community.findOne({ _id }).populate(
      "creator",
      "address"
    );
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
    const community = await Community.findOne({ _id }).populate("members");

    return { name: community?.name, members: community?.members };
  }

  public async getCommunityProposals(
    _id: string,
    page: number = 1,
    limit: number = 30
  ) {
    const community = await Community.findById(_id);
    if (!community) {
      throw new AppError(404, "Community not found");
    }
    const query = { community: _id };
    const proposals = await paginateModel(Proposal, query, page, limit);
    return { name: community?.name, proposals };
  }

  public async getCommunityPosts(
    _id: string,
    page: number = 1,
    limit: number = 30
  ) {
    const community = await Community.findById(_id);
    if (!community) {
      throw new AppError(404, "Community not found");
    }
    const query = { community: _id };
    const posts = await paginateModel(Post, query, page, limit);
    return { name: community?.name, posts };
  }

  public async getCommunityPolls(
    _id: string,
    page: number = 1,
    limit: number = 30
  ) {
    const community = await Community.findById(_id);
    if (!community) {
      throw new AppError(404, "Community not found");
    }
    const query = { community: _id };
    const polls = await paginateModel(Poll, query, page, limit);
    return { name: community?.name, polls };
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
