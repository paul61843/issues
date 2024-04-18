import express from 'express';

import { UserController } from '../controllers/user.js';

const router = express.Router();

const userController = new UserController();
router.post('/user/signup', userController.signup);
router.post('/user/login', userController.login);

export default router;