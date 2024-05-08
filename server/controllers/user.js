import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { jwtConfig } from "../config/index.js";

import { BaseController } from "./base.js";
import { UserService } from "../services/user.js"
import { catchAsync } from "../helpers/catchAsync.js";

function createToken(user) {
  return jwt.sign({ email: user.email }, jwtConfig.secret, jwtConfig.options);
}

export class UserController extends BaseController {

  constructor() {
    super();
    this.userService = new UserService();
  }

  login = catchAsync(async (req, res, next) => {
    const reqContent = req.body;
    const token = createToken(reqContent);

    const decoded = jwt.verify(token, jwtConfig.secret);
    console.log(decoded)

    res.status(200).json({ status: 'success', data: { token }});
  });

  signup = catchAsync(async (req, res, next) => {
    const reqContent = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(reqContent.password, salt);
    reqContent.password = hash;

    await this.userService.signup(reqContent);

    const token = createToken(res);

    res.status(200).json({ status: 'success', data: { token }});
  })
}