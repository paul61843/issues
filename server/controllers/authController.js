import jwt from "jsonwebtoken";

import { catchAsync } from "../helpers/catchAsync.js";
import { BaseController } from "./base.js";


export class AuthController extends BaseController {
    constructor() {
        super();
    }

    loginGuard = catchAsync(async (req, res, next) => {
        if (
            !req.headers.authorization && 
            !req.headers.authorization.startsWith('Bearer')
        ) {
            res.status(401).json({ status: 'fail', message: 'Unauthorized' });
            return;
        } 
        const token = req.headers.authorization.split(' ')[1];

        if(!token) {
            res.status(401).json({ status: 'fail', message: 'Unauthorized' });
            return;
        }

        const success = await jwt.verify(token, process.env.JWT_SECRET);

        if(!success) {
            res.status(401).json({ status: 'fail', message: 'Unauthorized' });
            return;
        }

        next();
    });
}