import { Router } from "express";
import bcrypt from "bcryptjs";
import { generateJWT } from "../auth/index.js";
import User from "../models/user.model.js";

export const authRoute = Router();

/* Registrazione utente */
authRoute.post("/register", async (req, res, next) => {
  try {
    let user = await User.create({
      ...req.body,
      password: await bcrypt.hash(req.body.password, 12),
    });

    res.send(user);
  } catch (err) {
    next(err);
  }
});

/* Login utente */
authRoute.post("/login", async (req, res, next) => {
  try {
    let userFound = await User.findOne({
      email: req.body.email,
    });

    if (userFound) {
      const isPasswordMatching = bcrypt.compare(
        req.body.password,
        userFound.password
      );

      if (isPasswordMatching) {
        const token = await generateJWT({
          surname: userFound.surname,
          email: userFound.email,
        });

        res.send({ user: userFound, token });
      } else {
        res.status(400).send("Password sbagliata");
      }
    } else {
      res.status(400).send("Utente non trovato");
    }
  } catch (err) {
    next(err);
  }
});