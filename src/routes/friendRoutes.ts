import express from 'express';
import friendController from '../controllers/friendController';

const router = express.Router();

// GET: Get a list of user's friends
router.get('/', friendController.getFriends);

// GET: Get details of a specific friend
router.get('/:id', friendController.getFriendById);

// POST: Send a friend request
router.post('/:id', friendController.sendFriendRequest);

// PUT: Accept/Reject a friend request
router.put('/:id', friendController.acceptOrRejectFriendRequest);

// DELETE: Remove a friend
router.delete('/:id', friendController.removeFriend);

export default router;
