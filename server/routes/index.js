import express from 'express';

import { UserController } from '../controllers/user.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'Hello World!' });
})

const userController = new UserController();
router.post('/user/signup', (req, res, next) => userController.signup(req, res, next));

export default router;