import { Response } from "express";
import { CommunityService } from "../services/community.service";
import AppError from "../utils/helpers/AppError";
import { ExtendedRequest } from "../utils/interfaces";

const communityService = new CommunityService();

export class CommunityController {
  public async getCommunities(request: ExtendedRequest, response: Response) {
    try {
      const communities = await communityService.getCommunities();
      return response.status(200).json(communities);
    } catch (error: any) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json(error.message);
      }
      return response.status(500).json(error.message);
    }
  }

  public async getCommunity(request: ExtendedRequest, response: Response) {
    const { id } = request.params;
    try {
      const community = await communityService.getCommunity(id);
      return response.status(200).json(community);
    } catch (error: any) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json(error.message);
      }
      return response.status(500).json(error?.message);
    }
  }

  public async createCommunity(request: ExtendedRequest, response: Response) {
    const payload = request.body;
    try {
      const community = await communityService.createCommunity(payload);
      return response.status(201).json(community);
    } catch (error: any) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json(error.message);
      }
      return response.status(500).json(error?.message);
    }
  }

  public async updateCommunity(request: ExtendedRequest, response: Response) {
    const { id } = request.params;
    const payload = request.body;
    const user = request?.user;

    if (user?.address !== payload?.creator)
      return response
        .status(401)
        .json(
          "Authorization error. You are not allowed to update this resource"
        );

    try {
      const community = await communityService.updateCommunity(id, payload);
      return response.status(201).json(community);
    } catch (error: any) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json(error.message);
      }
      return response.status(500).json(error?.message);
    }
  }

  public async deleteCommunity(request: ExtendedRequest, response: Response) {
    const { id } = request.params;
    const user = request?.user;

    if (!user?.communities?.includes(id))
      return response
        .status(401)
        .json(
          "Authorization error. You are not allowed to delete this resource"
        );
    try {
      const community = await communityService.deleteCommunity(id);
      return response.status(201).json(community);
    } catch (error: any) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json(error.message);
      }
      return response.status(500).json(error?.message);
    }
  }

  public async getCommunityMembers(
    request: ExtendedRequest,
    response: Response
  ) {
    const { id } = request.params;
    try {
      const members = await communityService.getCommunityMembers(id);
      return response.status(200).json(members);
    } catch (error: any) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json(error.message);
      }
      return response.status(500).json(error?.message);
    }
  }

  public async getCommunityStats(request: ExtendedRequest, response: Response) {
    const { id } = request.params;
    try {
      const stats = await communityService.getCommunityStats(id);
      return response.status(200).json({ ...stats });
    } catch (error: any) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json(error.message);
      }
      return response.status(500).json(error?.message);
    }
  }

  public async getCommunityProposals(
    request: ExtendedRequest,
    response: Response
  ) {
    const { id } = request.params;
    try {
      const proposals = await communityService.getCommunityProposals(id);
      return response.status(200).json(proposals);
    } catch (error: any) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json(error.message);
      }
      return response.status(500).json(error?.message);
    }
  }

  public async getCommunityPosts(request: ExtendedRequest, response: Response) {
    const { id } = request.params;
    try {
      const posts = await communityService.getCommunityPosts(id);
      return response.status(200).json(posts);
    } catch (error: any) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json(error.message);
      }
      return response.status(500).json(error?.message);
    }
  }

  public async getCommunityPolls(request: ExtendedRequest, response: Response) {
    const { id } = request.params;
    try {
      const polls = await communityService.getCommunityPolls(id);
      return response.status(200).json(polls);
    } catch (error: any) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json(error.message);
      }
      return response.status(500).json(error?.message);
    }
  }
}
