import { BaseService } from './base.js';
import { UserModel } from '../models/index.js';

export class UserService extends BaseService {

    constructor() {
        super();
        this.userModel = new UserModel();
    }

    async login(reqContent) {
        return this.userModel.login(reqContent);
    }

    async signup(reqContent) {
        await this.userModel.create(reqContent);
    }

    async getUserInfo(reqContent) {
        return await this.userModel.userInfo(reqContent);
    }

    async updateUserInfo(req, res, next) {
        return await this.updateUser(req.params.id);
    }
}