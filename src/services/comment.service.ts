import { Comment } from "../models/comment.model";

export class CommentService {
  public async getComments(parentId: string) {
    const comments = await Comment.find({ parentId });
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

  public async replyComment(_id: string, payload: any) {
    await Comment.findOneAndUpdate(
      {
        _id,
      },
      {
        $push: { replies: payload },
      },
      {
        new: true,
      }
    );

    return "Successfully replied comment";
  }

  public async applaudReply(_id: string, userId: string) {
    await Comment.findOneAndUpdate(
      {
        _id,
      },
      {
        replies: {
          $set: { applauds: userId },
        },
      },
      {
        new: true,
      }
    );

    return "Successfully applauded comment";
  }

  public async lendVoiceOnReply(_id: string, userId: string, amount: number) {
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
}
