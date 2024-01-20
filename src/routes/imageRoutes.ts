import express from "express";
import imageController from "../controllers/imageController";
import { upload } from "../middleware/imageSaver";

const imageRoutes = express.Router();

// POST: Create a new image
imageRoutes.post("/", upload.single("image"), imageController.createImage);

// GET: Retrieve all images
imageRoutes.get("/", imageController.getAllImages);

// GET: Retrieve a single image by ID
imageRoutes.get("/:id", imageController.getImageById);

// PUT: Update an image by ID
imageRoutes.put("/:id", imageController.updateImage);

// DELETE: Delete an image by ID
imageRoutes.delete("/:id", imageController.deleteImage);

export default imageRoutes;
