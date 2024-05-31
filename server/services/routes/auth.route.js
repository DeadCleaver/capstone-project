import { Router } from "express";
import bcrypt from "bcryptjs";
import { generateJWT } from "../auth/index.js";
import User from "../models/user.model.js";
import { authMid } from "../auth/index.js";
import passport from "passport";

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
      const isPasswordMatching = await bcrypt.compare(
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

// cambio password
authRoute.patch('/password', authMid, async (req, res, next) => {
  try {
    const { password, confirmpassword } = req.body;
    const userId = req.user.id; 

    if (password !== confirmpassword) {
      return res.status(400).send({ error: 'Le password sono diverse!' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.findById(userId); 
    if (!user) {
      return res.status(404).send({ error: 'Utente non trovato' });
    }

    user.password = hashedPassword;
    await user.save();

    res.send({ message: 'Password modificata con successo' });
  } catch (err) {
    next(err);
  }
});

/* GOOGLE LOGIN */

authRoute.get(
  "/googleLogin",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRoute.get(
  "/callback",
  passport.authenticate("google", { session: false }),
  (req, res, next) => {
    try {
      res.redirect(`http://localhost:3000/verifylogin?token=${req.user.token}`); // reinderizzare a home?
    } catch (err) {
      next(err);
    }
  }
);