import express from 'express';
import { publicRouter } from '../route/public-api';
import { errorMiddleware } from '../middleware/error-middleware';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { authApi } from '../route/auth-api';

export const web = express();
web.use(express.json());
web.use(express.static('public'));
web.use(cors({ origin: 'https://wisata-kita.vercel.app', credentials: true }));
web.use(cookieParser());

web.use(publicRouter);
web.use(authApi);

web.use(errorMiddleware);
