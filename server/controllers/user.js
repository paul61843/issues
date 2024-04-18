import bcrypt from "bcryptjs";

import { BaseController } from "./base.js";
import { UserService } from "../services/user.js"
import { catchAsync } from "../helpers/catchAsync.js";

export class UserController extends BaseController {

  constructor() {
    super();
    this.userService = new UserService();
  }

  login = catchAsync(async (req, res, next) => {
    const reqContent = req.body;
    await this.userService.login(reqContent);
    res.status(200).json({ status: 'success' });
  });

  signup = catchAsync(async (req, res, next) => {
    const reqContent = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(reqContent.password, salt);
    reqContent.password = hash;

    await this.userService.signup(reqContent);
    res.status(200).json({ status: 'success' });
  })
}