import mysql from 'mysql2/promise';
import { poolConfig } from '../config/index.js';

export class BaseModel {

    constructor() {
    }

    async connectDB() {
        return await mysql.createConnection(poolConfig);
    }

    async query(...queryArgs) {
        const conn = await this.connectDB();
        const res = await conn.query(...queryArgs);
        conn.end();
        return res;
    }
}