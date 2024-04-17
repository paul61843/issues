import { BaseService } from './base.js';
import { UserModel } from '../models/index.js';

export class UserService extends BaseService {

    constructor() {
        super();
        this.userModel = new UserModel();
    }

    async login(user, password) {
        return { id, name: 'John Doe' };
    }

    async signup(reqContent) {
        await this.userModel.create(reqContent);
    }

    async getCurrentUser(req, res, next) {
        return await this.login(req.params.id);
    }

    async updateUserInfo(req, res, next) {
        return await this.updateUser(req.params.id);
    }
}