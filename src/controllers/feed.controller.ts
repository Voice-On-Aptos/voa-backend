import { Response } from "express";
import { FeedService } from "../services/feed.service";
import AppError from "../utils/helpers/AppError";
import { ExtendedRequest } from "../utils/interfaces";

const feedService = new FeedService();

export class FeedController {
  public async getFeed(
    request: ExtendedRequest,
    response: Response
  ): Promise<void> {
    try {
      const { limit, status } = request.query;
      const feed = await feedService.getFeed(Number(limit));
      response.status(200).json(feed);
    } catch (error: any) {
      if (error instanceof AppError) {
        response.status(error.statusCode).json({ message: error.message });
      } else {
        response.status(500).json({ message: "Internal Server Error" });
      }
    }
  }
}
