import PostController from "../controllers/postController"; // Update this path
import express from "express";

const postRouts = express.Router();

// Routes for the Post entity
postRouts.post("/", PostController.createPost);
postRouts.get("/", PostController.getAllPosts);
postRouts.get("/:id", PostController.getPostById);
postRouts.put("/:id", PostController.updatePost);
postRouts.delete("/:id", PostController.deletePost);

export default postRouts;
