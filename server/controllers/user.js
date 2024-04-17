import { BaseController } from "./base.js";
import { UserService } from "../services/user.js"
import { catchAsync } from "../helpers/catchAsync.js";

export class UserController extends BaseController {

  constructor() {
    super();
    this.userService = new UserService();
  }

  signup = catchAsync(async (req, res, next) => {
    const reqContent = req.body;
    await this.userService.signup(reqContent);
    res.status(200).json({ status: 'success' });
  })
}