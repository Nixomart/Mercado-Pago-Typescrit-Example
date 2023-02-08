import { Request, Response } from "express";
import  User  from "../models/User";

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

export const getUser = async(req: Request, res: Response) =>{
  try {
    const {id} = req.params
    const newUser = await User.findOne({
      where: {
        id,
      },
    });
    res.status(201).json({message: 'usuario encontrado', newUser})

  } catch (error) {
    console.log(error)
    res.status(500).json({message: 'error al crear usuario'})
  }
}
