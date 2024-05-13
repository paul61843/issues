import { BaseModel } from './base.js';

export class UserModel extends BaseModel {
  constructor() {
    super();
    this.table = 'users';
  }

  async login({ email }) {
    const user = await this.query(
      `SELECT * FROM ${this.table} WHERE email = ?`, 
      [email],
    );
    return user;
  }

  async create({ firstName, lastName, email, password, role}) {
    await this.query(
      `INSERT INTO ${this.table} (first_name, last_name, email, password, role, created, updated) VALUES (?,?,?,?,?,NOW(),NOW())`, 
      [firstName, lastName, email, password, role],
    );
  }

  async userInfo({ id }) {
    const user = await this.query(
      `SELECT * FROM ${this.table} WHERE id = ?`, 
      [id],
    );
    return user;
  }


}