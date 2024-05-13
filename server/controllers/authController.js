import jwt from "jsonwebtoken";

import { AppError } from "../helpers/appError.js";
import { catchAsync } from "../helpers/catchAsync.js";
import { BaseController } from "./base.js";
import { UserService } from "../services/user.js";


export class AuthController extends BaseController {
    constructor() {
        super();
    }

    loginGuard = catchAsync(async (req, res, next) => {
        if (
            !req.headers.authorization && 
            !req.headers.authorization.startsWith('Bearer')
        ) {
            return next(AppError('Unauthorized', 401));
        } 
        const token = req.headers.authorization.split(' ')[1];

        if(!token) {
            return next(AppError('Unauthorized', 401));
        }

        const payload = await jwt.verify(token, process.env.JWT_SECRET);

        if(!success) {
            return next(AppError('Unauthorized', 401));
        }

        const [userInfo] = await UserService.getUserInfo({ id: payload.id });

        if(userInfo.length === 0) {
            return next(AppError('Unauthorized', 401));
        }

        next();
    });
}