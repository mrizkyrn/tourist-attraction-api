import express from 'express';
import { UserController } from '../controller/user-controller';
import { authMiddleware } from '../middleware/auth-middleware';
import { permit } from '../middleware/permit-middleware';

export const authApi = express.Router();
authApi.use(authMiddleware);
authApi.get('/api/users', permit('ADMIN'), UserController.getUsers);
authApi.get('/api/users/username/:username', permit('ADMIN'), UserController.getUserByUsername);
authApi.get('/api/users/current', UserController.getCurrentUser);
authApi.post('/api/users/logout', UserController.logout);
authApi.patch('/api/users/current', UserController.updateCurrentUser);
authApi.delete('/api/users/:username', permit('ADMIN'), UserController.deleteUserByUsername);