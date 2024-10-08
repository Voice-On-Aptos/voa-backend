import { Comment, Reply } from "../models/comment.model";
export class CommentService {
  public async getComments(parentId: string, type: string) {
    const comments = await Comment.find({
      parentId: parentId,
      __t:
        type === "post"
          ? "PostComment"
          : type === "proposal"
          ? "ProposalComment"
          : "",
    }).populate("replies");
    return comments;
  }

  public async applaudComment(_id: string, userId: string) {
    await Comment.findOneAndUpdate(
      {
        _id,
      },
      {
        $set: { applauds: userId },
      },
      {
        new: true,
      }
    );

    return "Successfully applauded comment";
  }

  public async lendVoiceOnComment(_id: string, userId: string, amount: number) {
    await Comment.findOneAndUpdate(
      {
        _id,
        "lentVoices.by": { $ne: userId },
      },
      {
        $push: { lentVoices: { by: userId, amount } },
      },
      {
        new: true,
      }
    );

    return "Successfully applauded comment";
  }

  public async replyComment(payload: any) {
    const reply = new Reply(payload);
    await reply.save();

    return "Successfully replied comment";
  }

  public async applaudReply(_id: string, userId: string) {
    await Reply.findOneAndUpdate(
      {
        _id,
      },
      {
        $set: { applauds: userId },
      },
      {
        new: true,
      }
    );

    return "Successfully applauded reply";
  }

  public async lendVoiceOnReply(_id: string, userId: string, amount: number) {
    await Reply.findOneAndUpdate(
      {
        _id,
        "lentVoices.by": { $ne: userId },
      },
      {
        $push: { lentVoices: { by: userId, amount } },
      },
      {
        new: true,
      }
    );

    return "Successfully applauded reply";
  }
}
