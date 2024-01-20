import FriendModel, { Friend } from "../models/friendModel";
import { Request, Response } from "express";

import UserModel from "../models/user";
import mongoose from "mongoose";

class FriendController {
  // GET: Get a list of user's friends
  async getFriends(req: Request, res: Response) {
    try {
      // Replace with logic to fetch the user's friends from the database
      const userId: mongoose.Types.ObjectId = req.body.userId; // Assuming you have authentication middleware
      const friends: Friend[] = await FriendModel.find({
        $or: [{ userID1: userId }, { userID2: userId }],
      });
      const friendsIds: { _id: mongoose.Types.ObjectId }[] = [...friends].map(
        (f: Friend) => {
          return { _id: f.userID1 === userId ? f.userID2 : f.userID1 };
        }
      );
      const friendsList = await UserModel.find({ $or: friendsIds}).select('username');
     
      res.json(friendsList);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while fetching user's friends" });
    }
  }

  // GET: Get details of a specific friend
  async getFriendById(req: Request, res: Response) {
    const friendId = req.params.id;

    try {
      // Replace with logic to fetch the details of a specific friend by ID
      const friend = await FriendModel.findById(friendId);
      if (!friend) {
        return res.status(404).json({ error: "Friend not found" });
      }
      res.json(friend);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while fetching the friend" });
    }
  }

  // POST: Send a friend request
  async sendFriendRequest(req: Request, res: Response) {
    try {
      // Replace with logic to send a friend request
      const userId = req.body.userId; // Assuming you have authentication middleware
      const friendId = req.params.id;

      // Check if a friend request already exists
      const existingRequest = await FriendModel.findOne({
        $or: [
          { userID1: userId, userID2: friendId },
          { userID1: friendId, userID2: userId },
        ],
      });

      if (existingRequest) {
        return res.status(400).json({ error: "Friend request already sent" });
      }

      // Create a new friend request
      const friendRequest = new FriendModel({
        userID1: userId,
        userID2: friendId,
        status: "requested", // You can set the initial status
      });
      await friendRequest.save();

      res.status(201).json(friendRequest);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while sending the friend request" });
    }
  }

  // PUT: Accept/Reject a friend request
  async acceptOrRejectFriendRequest(req: Request, res: Response) {
    const friendId = req.params.id;
    const action = req.body.action; // 'accept' or 'reject'

    try {
      // Replace with logic to accept or reject a friend request
      const friendRequest = await FriendModel.findById(friendId);

      if (!friendRequest) {
        return res.status(404).json({ error: "Friend request not found" });
      }

      // Check if the user has the authority to accept/reject this request
      if (friendRequest.userID2.toString() !== req.body.userId) {
        return res.status(403).json({ error: "Unauthorized action" });
      }

      if (action === "accept") {
        friendRequest.status = "accepted";
      } else if (action === "reject") {
        friendRequest.status = "rejected";
      } else {
        return res.status(400).json({ error: "Invalid action" });
      }

      await friendRequest.save();
      res.json(friendRequest);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while processing the request" });
    }
  }

  // DELETE: Remove a friend
  async removeFriend(req: Request, res: Response) {
    const friendId = req.params.id;

    try {
      // Replace with logic to remove a friend
      const friend = await FriendModel.findByIdAndDelete({ _id: friendId });

      if (!friend) {
        return res.status(404).json({ error: "Friend not found" });
      }
      res.json({ message: "Friend removed successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while removing the friend" });
    }
  }
}

const friendController = new FriendController();
export default friendController;
