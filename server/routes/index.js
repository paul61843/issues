import express from 'express';

import { UserController } from '../controllers/user.js';
import { AuthController } from '../controllers/authController.js';

const router = express.Router();

const authController = new AuthController();
const userController = new UserController();

router.route('/user/login').post(userController.login);
router.route('/user/signup').post(userController.signup);
router.route('/user/:id').get(
    [authController.loginGuard, authController.permissionGuard(['user'])],
    userController.userInfo
)

export default router;