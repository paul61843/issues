import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { catchError } from './middlewares/exception.js';
import { corsOptions } from './config/cors.js';
import { AppError } from './helpers/appError.js';

import routes from './routes/index.js';

dotenv.config()

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routes);

app.use('*', (req, res, next) => {
    next(new AppError(`404 ${req.originalUrl}`, 404));
})

app.use(catchError)

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});