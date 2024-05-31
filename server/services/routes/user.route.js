import { Router } from "express";
import User from "../models/user.model.js";
import { authMid } from "../auth/index.js";
import { uploadAvatar } from "../middlewares/multer.js"; // fare una cartella a parte dal progetto Striveblog?

export const userRoute = Router();

/* crea un utente - SOSTITUITO DALLA ROUTE /register */
userRoute.post("/", async (req, res, next) => {
  try {
    let user = await User.create(req.body);
    res.send(user).status(400);
  } catch (err) {
    next(err);
  }
});

/* chiamata su /me per ricevere i dati dell'autore dal token JWT */
userRoute.get("/me", authMid, async (req, res, next) => {
  try {
    let user = await User.findById(req.user.id);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

/* ottiene l'elenco degli utenti */
userRoute.get("/", async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

/* richiesta DELETE di un utente */

userRoute.delete("/:id", authMid, async (req, res, next) => {
  try {
    await User.deleteOne({
      _id: req.params.id,
    });
    res.send("L'utente è stato eliminato correttamente").status(204);
  } catch (err) {
    next(err);
  }
});

/* richiesta PUT di un utente */

userRoute.put("/:id", authMid, async (req, res, next) => {
  try {
    let user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.send(user);
  } catch (err) {
    next(err);
  }
});

/* IMMAGINI */

/* richiesta PATCH per l'immagine avatar dell'utente */
userRoute.patch("/:id/avatar", uploadAvatar, async (req, res, next) => {
  try {
    let updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { avatar: req.file.path },
      { new: true }
    );
    res.send(updatedUser);
  } catch (err) {
    next(err);
  }
});
