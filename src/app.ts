import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from "body-parser";

import {authRouter} from "./routes/auth";

dotenv.config();
const app: Application = express();

const PORT: number = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/v1/', authRouter);

app.use('*', (req: Request, res: Response): void => {
    res.status(404).json({
        status: "Fail",
        message: "Not found",
    });
})

app.listen(PORT, (): void => {
    console.log('SERVER IS UP ON PORT:', PORT);
});