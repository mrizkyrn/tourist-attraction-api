import express from 'express';
import { UserController } from '../controller/user-controller';
import { authMiddleware } from '../middleware/auth-middleware';

export const authApi = express.Router();
authApi.use(authMiddleware);
authApi.post('/api/users/logout', UserController.logout);