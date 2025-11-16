import jwt from "jsonwebtoken";

export const createToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY as string);
};
