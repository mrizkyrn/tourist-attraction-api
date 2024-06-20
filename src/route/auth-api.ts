import express from 'express';
import { UserController } from '../controller/user-controller';
import { TouristAttractionController } from '../controller/tourist-attraction-controller';
import { authMiddleware } from '../middleware/auth-middleware';
import { permit } from '../middleware/permit-middleware';
import { upload } from '../application/multer';

export const authApi = express.Router();
authApi.use(authMiddleware);

// User routes
authApi.get('/api/users', permit('ADMIN'), UserController.getUsers);
authApi.get('/api/users/username/:username', permit('ADMIN'), UserController.getUserByUsername);
authApi.get('/api/users/current', UserController.getCurrentUser);
authApi.post('/api/users/logout', UserController.logout);
authApi.patch('/api/users/current', UserController.updateCurrentUser);
authApi.delete('/api/users/:username', permit('ADMIN'), UserController.deleteUserByUsername);

// Tourist attraction routes
authApi.post('/api/tourist-attractions', upload.single('thumbnail'), TouristAttractionController.create);
authApi.get('/api/tourist-attractions', TouristAttractionController.search);
authApi.get('/api/tourist-attractions/:id', TouristAttractionController.getDetailById);
authApi.get('/api/tourist-attractions/status/:status', permit('ADMIN'), TouristAttractionController.getByStatus);
authApi.put('/api/tourist-attractions/:id', TouristAttractionController.update);
authApi.delete('/api/tourist-attractions/:id', TouristAttractionController.delete);