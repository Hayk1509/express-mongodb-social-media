import UserController from '../controllers/userController';
// userRoutes.ts
import express from 'express';

const router = express.Router();
const userController = new UserController();

// GET: Get a list of all users
router.get('/', userController.getUsers);

// GET: Get a specific user by ID
router.get('/:id', userController.getUserById);

// POST: Create a new user
router.post('/', userController.createUser);

// PUT: Update a user's information
router.put('/:id', userController.updateUser);

// DELETE: Delete a user by ID
router.delete('/:id', userController.deleteUser);

export default router;
