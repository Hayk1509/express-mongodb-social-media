import { Request, Response } from "express";

import PostModel from "../models/postModel"; // Update this path to your Post model

class PostController {
  // Create a new post
  async createPost(req: Request, res: Response) {
    try {
      const { userID, content } = req.body;
      const newPost = new PostModel({ userID, content });
      await newPost.save();
      res.status(201).json(newPost);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get all posts
  async getAllPosts(req: Request, res: Response) {
    try {
      const posts = await PostModel.find();
      res.json(posts);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get a single post by ID
  async getPostById(req: Request, res: Response) {
    try {
      const post = await PostModel.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.json(post);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Update a post by ID
  async updatePost(req: Request, res: Response) {
    try {
      const updatedPost = await PostModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedPost) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.json(updatedPost);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Delete a post by ID
  async deletePost(req: Request, res: Response) {
    try {
      const deletedPost = await PostModel.findByIdAndDelete(req.params.id);
      if (!deletedPost) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new PostController();
