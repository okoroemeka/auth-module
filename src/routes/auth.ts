import express, {Router} from "express";
import {CreateUser} from "../controllers/auth";

const authRouter: Router = express.Router();

authRouter.post('/create-user', CreateUser);

export {
    authRouter
}