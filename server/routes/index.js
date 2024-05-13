import express from 'express';

import { UserController } from '../controllers/user.js';
import { AuthController } from '../controllers/authController.js';

const router = express.Router();

const authController = new AuthController();
const userController = new UserController();

router.post('/user/login',userController.login);
router.post('/user/signup',userController.signup);
router.get('/user/:id', authController.loginGuard, userController.userInfo)

export default router;