import { Request, Response } from "express";

import ImageModel from "../models/imageModel"; // Update this path to your Image model

class ImageController {
  async createImage(req: Request, res: Response) {
    try {
      if (req.file) {
        const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req
          .file.filename!}`;
        const { description, userID } = req.body; // Additional fields from the body
        const newImage = new ImageModel({
          userID,
          imagePath: imageUrl,
          description,
        });
        await newImage.save();
        res.status(201).json(newImage);
      } else {
        res.status(500).json({ error: { message: "" } });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllImages(req: Request, res: Response) {
    try {
      const images = await ImageModel.find();
      res.json(images);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getImageById(req: Request, res: Response) {
    try {
      const image = await ImageModel.findById(req.params.id);
      if (!image) {
        return res.status(404).json({ message: "Image not found" });
      }
      res.json(image);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateImage(req: Request, res: Response) {
    try {
      const updatedImage = await ImageModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedImage) {
        return res.status(404).json({ message: "Image not found" });
      }
      res.json(updatedImage);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteImage(req: Request, res: Response) {
    try {
      const deletedImage = await ImageModel.findByIdAndDelete(req.params.id);
      if (!deletedImage) {
        return res.status(404).json({ message: "Image not found" });
      }
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
const imageController = new ImageController();
export default imageController;
