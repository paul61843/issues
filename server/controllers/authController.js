import jwt from "jsonwebtoken";

import { AppError } from "../helpers/appError.js";
import { catchAsync } from "../helpers/catchAsync.js";
import { BaseController } from "./base.js";
import { UserService } from "../services/user.js";


export class AuthController extends BaseController {

    userService = new UserService();

    constructor() {
        super();
    }

    loginGuard = catchAsync(async (req, res, next) => {
        if (
            !req.headers.authorization && 
            !req.headers.authorization.startsWith('Bearer')
        ) {
            return next(new appError('Unauthorized', 401));
        } 
        const token = req.headers.authorization.split(' ')[1];

        if(!token) {
            return next(new AppError('Unauthorized', 401));
        }

        const payload = await jwt.verify(token, process.env.JWT_SECRET);

        if(!payload) {
            return next(new AppError('Unauthorized', 401));
        }

        console.log(payload.id)
        const [userInfo] = await this.userService.getUserInfo({ id: payload.id });

        if(userInfo.length === 0) {
            return next(new AppError('Unauthorized', 401));
        }

        req.user = userInfo[0];

        next();
    });

    permissionGuard = (allowRole) => (async (req, res, next) => {
        const { role } = req.user;

        console.log(allowRole)
        
        if(!allowRole.includes(role)) {
            return next(new AppError('沒有權限', 401));
        }
        next();
    });
}