import { Request, Response } from "express";
import { User } from "../models/User";

export const createUserController =async (req: Request, res: Response) => {
  try {
    const {username, password} = req.body;
    const newUser = await User.create({
      username,
      password
    })

    res.status(201).json({message: 'usuario creado', newUser})
  } catch (error) {
    console.log(error)
    res.status(500).json({message: 'error al crear usuario'})
  }
};
