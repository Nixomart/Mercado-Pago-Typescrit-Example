import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import  User  from "../models/User";
import secret from "../secret";

export const signup = async (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(400).json({ message: "No se han enviado datos" });
  }
  const { username, password } = req.body;

if (!username || !password) {
  return res.status(400).json({ message: "Faltan datos obligatorios" });
}
  try {
    const { username, password } = req.body;
    const passwordHash = await User.encryptPassword(password);
    const user = await User.create({ username, password_hash: passwordHash });

    // jwt
    const token = jwt.sign({ id: user.id }, secret.pass, {
      expiresIn: 86400,
    });

    res.status(201).json({ message: 'usuario creado', user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'error al crear usuario' });
  }
};

export const signin = async (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(400).json({ message: "No se han enviado datos" });
  }
  const { username, password } = req.body;

if (!username || !password) {
  return res.status(400).json({ message: "Faltan datos obligatorios" });
}
  try {
    // we look the user and with populate function we show the roles with de user attribute "roles"
    const userFound = await User.findOne({ where: { username } });

    if (!userFound) return res.status(400).json({ message: 'user not found' });

    // we compare the password in the body with the user password
    const passwordCompare = await User.comparePassword(password, userFound.password_hash);
    if (!passwordCompare)
      return res.status(401).json({ token: null, message: 'invalid password' });

    // after find user we create a token with jwt and return it
    const token = jwt.sign({ id: userFound.id }, secret.pass, {
      expiresIn: 86400,
    });

    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'error al iniciar sesión' });
  }
};
