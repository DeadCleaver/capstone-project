import { Router } from "express";
import { authMid } from "../auth/index.js";
import Game from "../models/game.model.js";

import { uploadCover } from "../middlewares/multer.js";

export const gameRoute = Router();

// DA RIVEDERE TUTTO

// Route POST per creare un nuovo gioco
gameRoute.post("/", authMid, async (req, res, next) => {
  try {
    const { gametitle, gamedescription } = req.body;
    const newGame = await Game.create({ gametitle, gamedescription });
    return res.status(201).json(newGame);
  } catch (err) {
    next(err);
  }
});

// Route PUT per aggiornare un gioco esistente
gameRoute.put("/:id", authMid, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { gametitle, gamedescription } = req.body;
    const updatedGame = await Game.findByIdAndUpdate(id, { gametitle, gamedescription }, { new: true });
    if (!updatedGame) {
      return res.status(404).send("Gioco non trovato");
    }
    return res.status(200).json(updatedGame);
  } catch (err) {
    next(err);
  }
});

// Route DELETE per eliminare un gioco esistente
gameRoute.delete("/:id", authMid, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedGame = await Game.findByIdAndDelete(id);
    if (!deletedGame) {      
      let err = new Error("Gioco non trovato");
      err.status = 404;
      throw err;
    }
    return res.status(200).send("Gioco eliminato con successo");
  } catch (err) {
    next(err);
  }
});

// Route GET per ottenere tutti i giochi
gameRoute.get("/", async (req, res, next) => {
  try {
    const games = await Game.find();
    return res.status(200).json(games);
  } catch (err) {
    next(err);
  }
});

export default gameRoute;