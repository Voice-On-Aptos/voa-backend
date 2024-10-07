import { Poll } from "../models/poll.model";
import { Post } from "../models/post.model";
import { Proposal } from "../models/proposal.model";

export class FeedService {
  public async getFeed(limit = 30) {
    const posts = await Post.find().populate("author").populate("community").sort({ createdAt: -1 }).limit(limit);

    // Fetch the 10 most recent polls
    const polls = await Poll.find().populate("author").populate("community").sort({ createdAt: -1 }).limit(limit);

    // Fetch the 10 most recent proposals
    const proposals = await Proposal.find().populate("author").populate("community").sort({ createdAt: -1 }).limit(limit);

    // Combine all items into one array
    let feed = [
      ...posts.map((post) => ({ type: "post", data: post })),
      ...polls.map((poll) => ({ type: "poll", data: poll })),
      ...proposals.map((proposal) => ({ type: "proposal", data: proposal })),
    ];

    // Shuffle the combined feed items to mix posts, polls, and proposals
    feed = this.shuffleArray(feed);

    return feed;
  }

  // Helper function to shuffle the array (Fisher-Yates shuffle)
  private shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
