import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { jwtConfig } from "../config/index.js";

import { BaseController } from "./base.js";
import { UserService } from "../services/user.js"
import { catchAsync } from "../helpers/catchAsync.js";

function createToken(user) {
  const payload = { id: user.id, email: user.email };
  return jwt.sign(payload, jwtConfig.secret, jwtConfig.options);
}

export class UserController extends BaseController {

  constructor() {
    super();
    this.userService = new UserService();
  }

  login = catchAsync(async (req, res, next) => {
    const reqContent = req.body;
    const token = createToken(reqContent);

    const [results, fields] = await this.userService.login(reqContent);
    const userInfo = results[0];

    const passwordCorrect = await bcrypt.compare(reqContent.password, userInfo.password);

    delete userInfo.password;

    if (!passwordCorrect) {
      res.status(401).json({ status: 'fail', message: 'Invalid email or password' });
      return;
    }

    res.status(200).json({ status: 'success', data: { token }});
  });

  signup = catchAsync(async (req, res, next) => {
    const reqContent = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(reqContent.password, salt);
    reqContent.password = hash;

    await this.userService.signup(reqContent);

    res.status(200).json({ status: 'success', message: 'User created successfully'});
  })

  userInfo = catchAsync(async (req, res, next) => {
    const reqContent = { id: req.params.id};
    const [results, fields] = await this.userService.getUserInfo(reqContent);

    res.status(200).json({ status: 'success', data: results[0]});
  })
}