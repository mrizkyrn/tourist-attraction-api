import express from 'express';
import { UserController } from '../controller/user-controller';
import { TouristAttractionController } from '../controller/tourist-attraction-controller';
import { AttractionApprovalController } from '../controller/attraction-approval-controller';
import { ReviewController } from '../controller/review-controller';
import { FavoriteController } from '../controller/favorite-controller';
import { authMiddleware } from '../middleware/auth-middleware';
import { permit } from '../middleware/permit-middleware';
import { upload } from '../application/multer';

export const authApi = express.Router();
authApi.use(authMiddleware);

// User routes
authApi.get('/api/users', permit('ADMIN'), UserController.getAll);
authApi.get('/api/users/username/:username', permit('ADMIN'), UserController.getByUsername);
authApi.get('/api/users/current', UserController.getCurrent);
authApi.post('/api/users/logout', UserController.logout);
authApi.patch('/api/users/current', UserController.updateCurrent);
authApi.patch('/api/users/current/password', UserController.updatePassword);
authApi.delete('/api/users/:username', permit('ADMIN'), UserController.deleteByUsername);

// Tourist attraction routes
authApi.post('/api/tourist-attractions', upload.single('thumbnail'), TouristAttractionController.create);
authApi.get('/api/tourist-attractions', TouristAttractionController.search);
authApi.get('/api/tourist-attractions/:id', TouristAttractionController.getDetailById);
authApi.get('/api/tourist-attractions/username/:username', TouristAttractionController.getByUsername);
authApi.get('/api/tourist-attractions/status/:status', permit('ADMIN'), TouristAttractionController.getByStatus);
authApi.put('/api/tourist-attractions/:id', upload.single('thumbnail'), TouristAttractionController.update);
authApi.delete('/api/tourist-attractions/:id', TouristAttractionController.delete);
authApi.post('/api/tourist-attractions/:id/approve', permit('ADMIN'), TouristAttractionController.approve);
authApi.post('/api/tourist-attractions/:id/reject', permit('ADMIN'), TouristAttractionController.reject);

// Attraction approval routes
authApi.get('/api/attraction-approvals', permit('ADMIN'), AttractionApprovalController.getAll);

// Review routes
authApi.get('/api/reviews/attraction/:id', ReviewController.getByAttractionId);
authApi.get('/api/reviews/username/:username/attraction/:id', ReviewController.getByUsernameAndAttractionId);
authApi.post('/api/reviews', ReviewController.create);
authApi.put('/api/reviews/:id', ReviewController.update);
authApi.delete('/api/reviews/:id', ReviewController.delete);

// Favorite routes
authApi.get('/api/favorites/username/:username', FavoriteController.getByUsername);
authApi.post('/api/favorites', FavoriteController.create);
authApi.delete('/api/favorites/:id', FavoriteController.delete);
authApi.get('/api/favorites/check', FavoriteController.checkFavorite);