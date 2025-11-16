import { HydratedDocument } from "mongoose";
import userModel from "../schema/userModel.js";
import { IUser } from "../interface/IUser.js";
import { Request, Response } from "express";
import { createToken } from "../utils/jwt-token.js";
import { io } from "../socket/socket.js";

//create user

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, email, password }: IUser = req.body;
  console.log(req);
  try {
    const user: HydratedDocument<IUser> | null = await userModel.findOne({
      email,
    });
    if (user) {
      res.json({ success: false, message: "user already exist." });
      return;
    }
    if (password.length < 8) {
      res.json({
        success: false,
        message: "password length must be greater or equal to 8.",
      });
      return;
    }
    const u = new userModel({ name, email, password });
    const newUser = await u.save();
    if (newUser) {
      const token: string = createToken(newUser._id.toString());
      res.json({
        success: true,
        message: " User registered successfully.",
        token,
      });
      return;
    }
  } catch (error: any) {
    res.json({ success: false, message: "server/db error." });
  }
};

///login

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password }: IUser = req.body;
  try {
    const user: HydratedDocument<IUser> | null = await userModel.findOne({
      email,
    });
    if (!user) {
      res.json({ success: false, message: "user dont exist." });
      return;
    }
    if (user.password === password) {
      const token: string = createToken(user._id.toString());
      res.json({
        success: true,
        message: " User login successfully.",
        id: user._id,
        token,
      });
      return;
    } else {
      res.json({
        success: false,
        message: "Invalid Credentials.",
      });
      return;
    }
  } catch (error) {
    res.json({
      success: false,
      message: "server/db error",
    });
    return;
  }
};

// update password

export const updatePassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, oldPassword, newPassword } = req.body;
  try {
    const user: HydratedDocument<IUser> | null = await userModel.findOne({
      email,
    });
    if (!user) {
      res.json({ success: false, message: "user dont exist." });
      return;
    }
    if (user.password === oldPassword) {
      const u: HydratedDocument<IUser> | null =
        await userModel.findByIdAndUpdate(
          user._id.toString(),
          { password: newPassword },
          { new: true }
        );
      if (u) {
        res.json({ success: true, message: "Password updated successfully." });
        return;
      }
    } else {
      res.json({
        success: false,
        message: "Invalid Credentials.",
      });
      return;
    }
  } catch (error: any) {
    res.json({ success: false, message: "server/db error." });
    return;
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.user?.id;
    if (id) {
      const del = await userModel.findByIdAndDelete(id);
      if (del) {
        res.json({ success: true, message: " user deleted successfully. " });
        return;
      }
    } else {
      res.json({ success: false, message: "server error" });
      return;
    }
  } catch (error: any) {
    res.json({ success: false, message: "server/db error." });
    return;
  }
};

// all  user

export const allUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.user?.id;
    const result = await userModel
      .find({ _id: { $ne: id } })
      .select("-password");
    if (result) {
      const data = result.map((i) => ({
        _id: i._id,
        name: i.name,
        email: i.email,
      }));
      res.json({ success: true, data: data });
      return;
    }
  } catch (error) {
    res.json({ success: false, message: "server/db error." });
    return;
  }
};
