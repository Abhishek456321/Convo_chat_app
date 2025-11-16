import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getMessage, storeMessage } from "../controller/messageController.js";

export const messageRouter = Router();
messageRouter.post("/:id", authMiddleware, storeMessage);
messageRouter.get("/:id", authMiddleware, getMessage);
