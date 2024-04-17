import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { corsOptions } from './config/cors.js';

import routes from './routes/index.js';

dotenv.config()

const app = express();
const port = process.env.PORT;

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api', routes);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});