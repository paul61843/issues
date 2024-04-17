import { BaseModel } from './base.js';

export class UserModel extends BaseModel {
  constructor() {
    super();
    this.table = 'users';
  }

  async create({ firstName, lastName, email, password}) {
      console.log('model', firstName, lastName, email);
      return await this.query(
      `INSERT INTO ${this.table} (first_name, last_name, email, password) VALUES (?,?,?,?)`, 
      [firstName, lastName, email, password],
    );
  }

}