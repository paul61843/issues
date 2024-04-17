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
        try {
            const res = await this.userModel.create(reqContent);
            res.status(200).join({ message: 'User created successfully' })
        } catch (error) {
            res.status(400).json(error);
        }
    }

    async getCurrentUser(req, res, next) {
        try {
            const user = await this.login(req.params.id);
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    async updateUserInfo(req, res, next) {
        try {
            const user = await this.updateUser(req.params.id);
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json(error);
        }
    }
}