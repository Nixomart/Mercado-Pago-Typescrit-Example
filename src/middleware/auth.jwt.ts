import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/User";
import secret from "../secret";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["x-access-token"];
  if (!token) return res.status(403).json({ message: "No token provided" });
  try {

    const {id} = jwt.verify(<string>token, secret.pass) as JwtPayload;
    const user = await User.findOne({
      where: { id },
      attributes: { exclude: ["password"] },  
    });

    if (!user) return res.status(404).json({ message: "User not Found" });

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
