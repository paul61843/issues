import { BaseController } from "./base.js";
import { UserService } from "../services/user.js"

export class UserController extends BaseController {

  constructor() {
    super();
    console.log(this)
    this.userService = new UserService();
  }

  async signup(req, res, next) {
    try {
      const reqContent = req.body;
      const user = await this.userService.signup(reqContent);
      res.status(200).json({ status: 'success' });
    } catch (error) {
      console.log(error)
      res.status(400).json(error);
    }
  }
}