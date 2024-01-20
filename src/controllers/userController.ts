// userController.ts
import { Request, Response } from "express";

import UserModel from "../models/user";

class UserController {
  // GET: Get a list of all users
  async getUsers(req: Request, res: Response) {
    try {
      const users = await UserModel.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "An error occurred while fetching users" });
    }
  }

  // GET: Get a specific user by ID
  async getUserById(req: Request, res: Response) {
    const userId = req.params.id;

    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while fetching the user" });
    }
  }

  // POST: Create a new user
  async createUser(req: Request, res: Response) {
    const userData = req.body;

    try {
      const newUser = new UserModel(userData);
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ error: "Invalid user data" });
    }
  }

  // PUT: Update a user's information
  async updateUser(req: Request, res: Response) {
    const userId = req.params.id;
    const updatedUserData = req.body;

    try {
      const user = await UserModel.findByIdAndUpdate(userId, updatedUserData, {
        new: true,
      });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: "Invalid user data" });
    }
  }

  // DELETE: Delete a user by ID
  async deleteUser(req: Request, res: Response) {
    const userId = req.params.id;

    try {
      const user = await UserModel.findByIdAndDelete({ _id: userId });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while deleting the user" });
    }
  }
}

export default UserController;
