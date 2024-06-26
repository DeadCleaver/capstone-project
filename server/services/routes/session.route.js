import { Router } from "express";
import Session from "../models/session.model.js";
import { authMid } from "../auth/index.js";
import { uploadCover } from "../middlewares/multer.js";
import User from "../models/user.model.js";

export const sessionRoute = Router();

/* chiamata GET tutti le sessioni presenti a sistema */
sessionRoute.get("/", async (req, res, next) => {
  try {
    const sessions = await Session.find().populate(`creator`).populate(`players`).populate('game').populate('city');
    res.json(sessions);
  } catch (err) {
    next(err);
  }
});

/* chiamata POST di una sessione */
sessionRoute.post("/", authMid, async (req, res, next) => {
  // non funziona senza authmid, per via di req user.id
  try {
    let post = await Session.create({
      ...req.body,
      creator: req.user.id,
    });
    res.send(post).status(400);
  } catch (err) {
    next(err);
  }
});

/* chiamata GET di una singola sessione */
sessionRoute.get("/:id", async (req, res, next) => {
  try {
    let post = await Session.findById(req.params.id).populate(`creator`).populate(`players`).populate(`game`).populate('city');
    res.send(post);
  } catch (err) {
    next(err);
  }
});

// chiamata GET di tutte le sessioni di uno specifico giocatore
sessionRoute.get("/creator/:creatorId", async (req, res, next) => {
  try {
    const sessions = await Session.find({ creator: req.params.creatorId }).populate(`creator`).populate(`players`).populate(`game`).populate('city');
    res.json(sessions);
  } catch (err) {
    next(err);
  }
});

/* chiamata DELETE di una sessione */

sessionRoute.delete("/:id", authMid, async (req, res, next) => {
  try {
    const session = await Session.findById(req.params.id);

    // Verifica se la sessione esiste
    if (!session) {
      return res.status(404).send("Sessione non trovata");
    }

    // Verifica se l'utente loggato è il creatore della sessione
    if (req.user._id.toString() !== session.creator.toString()) {
      let err = new Error(
        "Non sei autorizzato a modificare la sessione di un altro"
      );
      err.status = 403;
      throw err;
    }
    
    /*  await session.remove(); */
    await Session.findByIdAndDelete(req.params.id);

    return res.status(204).send("La sessione è stata eliminata");
  } catch (err) {
    next(err);
  }
});

/* chiamata PUT di una sessione */
// Da aggiungere: verifica che l'utente loggato sia il creatore della sessione
sessionRoute.put("/:id", authMid, async (req, res, next) => {
  try {
    let post = await Session.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.send(post);
  } catch (err) {
    next(err);
  }
});

/* IMMAGINI */
/* richiesta PATCH per l'immagine cover della sessione */
// Da aggiungere: verifica che l'utente loggato sia il creatore della sessione
sessionRoute.patch(
  "/:id/cover",
  authMid,
  uploadCover,
  async (req, res, next) => {
    try {
      let updatedCover = await Session.findByIdAndUpdate(
        req.params.id,
        { cover: req.file.path },
        { new: true }
      );
      res.send(updatedCover);
    } catch (err) {
      next(err);
    }
  }
);

/* GIOCATORI */

/* aggiungere un giocatore */
sessionRoute.post("/:sessionId/players", async (req, res, next) => {
  const { sessionId } = req.params;
  const { name, surname, email } = req.body;

  try {
    let user = await User.findOne({ email });

    // se il giocatore non esiste come utente  gli crea un utente, se esiste verifica che i dati siano uguali a quelli registrati
    if (user) {
      if (user.name !== name || user.surname !== surname) {
        return res.status(400).send("Nome e/o cognome non corrispondono ai dati registrati");
      }
    } else {
      user = new User({ name, surname, email });
      await user.save();
    }

    let session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).send("Sessione non trovata");
    }

    // Verifica se il numero di giocatori è già al massimo
    if (session.players.length >= session.maxplayers) {
      return res.status(400).send("Numero massimo di giocatori raggiunto");
    }

    // Verifica che il giocatore non sia già presente nell'elenco
    if (session.players.includes(user._id)) {
      return res.status(400).send("Il giocatore è già stato aggiunto alla sessione");
    }

    // aggiungi il giocatore alla sessione
    session.players.push(user._id);
    await session.save();

    res.status(200).send(session);
  } catch (err) {
    next(err);
  }
});


/* rimozione giocatore */
sessionRoute.delete("/:sessionId/players/:playerId", async (req, res, next) => {
  try {

    let session = await Session.findById(req.params.sessionId);

    if (!session) {
      return res.status(404).send("Sessione non trovata");
    }

    const playerIndex = session.players.indexOf(req.params.playerId);
    if (playerIndex === -1) {
      return res.status(404).send("Giocatore non presente");
    }
    
    session.players.splice(playerIndex, 1);

    await session.save();

    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

/* chiamata GET dei players di una sessione */
sessionRoute.get("/:sessionId/players", async (req, res, next) => {
  try {
    let sessionPlayers = await Session.findById(req.params.sessionId).select(`players`).populate(`players.user`);
    res.send(sessionPlayers);

    if (!sessionPlayers) {
      const error = new Error('Non sono stati trovati giocatori');
      error.status = 404;
      throw error;
    }

  } catch (error) {
    next(err);
  }
});


/* sessionRoute.delete(
  "/:sessionId/players/:playerId",
  authMid,
  async (req, res, next) => {
    const { sessionId, playerId } = req.params;

    try {
      const session = await Session.findById(sessionId);

      if (!session) {
        return res.status(404).send("Sessione non trovata");
      }

      if (req.user._id !== session.creator._id) {
        return res
          .status(403)
          .send("Solo il creatore della sessione può rimuovere giocatori");
      }

      // Rimuovi il giocatore dalla sessione filtrando ed escludendo se uguale a playerId
      session.players = session.players.filter(
        (player) => player.user.toString() !== playerId
      );

      await session.save();

      return res.status(200).send(session);
    } catch (err) {
      next(err);
    }
  }
); */

/* sessionRoute.delete(
  "/:sessionId/players/:playerId",
  async (req, res, next) => {
    const { sessionId, playerId } = req.params;

    try {
      const session = await Session.findById(sessionId);

      if (!session) {
        return res.status(404).send("Sessione non trovata");
      }

      // Rimuovi il giocatore dalla sessione filtrando ed escludendo se uguale a playerId
      session.players = session.players.filter(
        (player) => player.user.toString() !== playerId
      );

      await session.save();

      return res.status(200).send(session);
    } catch (err) {
      next(err);
    }
  }
); */