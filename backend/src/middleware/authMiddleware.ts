import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface JwtWithId extends JwtPayload {
  id: string;
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token =
      req.cookies?.token ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!token) {
      res.status(401).json({ success: false, message: "Please login." });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);

    // runtime check
    if (typeof decoded === "object" && decoded !== null && "id" in decoded) {
      req.user = { id: (decoded as JwtWithId).id };
      next();
    } else {
      res.status(401).json({ success: false, message: "Invalid token." });
    }
  } catch (error: any) {
    const message =
      error.name === "TokenExpiredError" ? "Token expired" : "Invalid token";
    res.status(401).json({ success: false, message });
  }
};
