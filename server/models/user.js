import { BaseModel } from './base.js';

export class UserModel extends BaseModel {
  constructor() {
    super();
    this.table = 'users';
  }

  async login({ email, password }) {
    const user = await this.query(
      `SELECT * FROM ${this.table} WHERE email = ? AND password = ?`, 
      [email, password],
    );
    return user;
  }

  async create({ firstName, lastName, email, password}) {
    await this.query(
      `INSERT INTO ${this.table} (first_name, last_name, email, password) VALUES (?,?,?,?)`, 
      [firstName, lastName, email, password],
    );
  }



}