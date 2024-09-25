import { PostComment } from "../models/comment.model";
import AppError from "../utils/helpers/AppError";
import { Post } from "./../models/post.model";

//get Post by id
//delete post
//update post
//update votes array
//update seen by

export class PostService {
  public async getPost(_id: string) {
    const post = await Post.findOne({ _id });
    if (!post) throw new AppError(404, "Post not found");
    return post;
  }

  public async createPost(payload: any) {
    const newPost = new Post(payload);
    await newPost.save();
    return newPost;
  }

  public async updatePost(_id: string, payload: any) {
    const post = await Post.findOneAndUpdate({ _id }, payload, {
      new: true,
    });
    if (!post) {
      throw new AppError(404, "Post not found");
    }
    return post;
  }

  public async deletePost(_id: string) {
    const post = await Post.findOneAndDelete({ _id });
    if (!post) {
      throw new AppError(404, "Post not found");
    }
    return "Post has been deleted successfully";
  }

  public async applaudPost(_id: string, userId: string) {
    await Post.findOneAndUpdate(
      {
        _id,
      },
      {
        $set: { seenBy: userId },
      },
      {
        new: true,
      }
    );

    return "Applauded successfully";
  }

  public async lendVoiceOnPost(_id: string, userId: string, voice: number) {
    await Post.findOneAndUpdate(
      {
        _id,
        "lentVoices.by": { $ne: userId }, // Ensure the user hasn't already lent
      },
      {
        $push: { lentVoices: { by: userId, voice } }, // Add voice lent
      },
      {
        new: true,
      }
    );

    return "Successfully lent a voice!";
  }

  public async updateSeenByPost(_id: string, userId: string) {
    await Post.findOneAndUpdate(
      {
        _id,
      },
      {
        $set: { seenBy: userId },
      },
      {
        new: true,
      }
    );

    return "Updated";
  }

  public async commentOnPost(_id: string, payload: any) {
    const comment = new PostComment({ ...payload, parentId: _id });
    await comment.save();
    return comment;
  }
}
