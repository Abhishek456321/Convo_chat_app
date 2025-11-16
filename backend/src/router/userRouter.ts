import { Router } from "express";
import {
  allUser,
  createUser,
  deleteUser,
  loginUser,
  updatePassword,
} from "../controller/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const userRouter = Router();
userRouter.post("/create", createUser);
userRouter.post("/login", loginUser);
userRouter.patch("/update", updatePassword);
userRouter.delete("/delete", authMiddleware, deleteUser);
userRouter.get("/", authMiddleware, allUser);
export default userRouter;
