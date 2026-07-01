import express from "express";
import * as authController from "../controller/auth.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/register", authController.registerUserController);

authRouter.post("/login", authController.loginUserController);

authRouter.post("/logout", authController.logoutUserController);

authRouter.get("/get-me", verifyToken, authController.getMeController);

export default authRouter;
