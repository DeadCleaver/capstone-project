import { Router } from "express";
import Session from "../models/session.model.js";
import { authMid } from "../auth/index.js";
import { uploadCover } from "../middlewares/multer.js";
import User from "../models/user.model.js";

export const sessionRoute = Router();

/* chiamata GET tutti le sessioni presenti a sistema */
sessionRoute.get("/", async (req, res, next) => {
  try {
    const sessions = await Session.find().populate(`creator`);
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
    let post = await Session.findById(req.params.id).populate(`creator`);
    res.send(post);
  } catch (err) {
    next(err);
  }
});

/* chiamata DELETE di una sessione */ 

// VECCHIA
/* sessionRoute.delete("/:id", authMid, async (req, res, next) => {
  try {
    await Session.deleteOne({
      _id: req.params.id,
    });
    res.send("La sessione è stata eliminata").status(204);
  } catch (err) {
    next(err);
  }
}); */

sessionRoute.delete("/:id", authMid, async (req, res, next) => {
  try {
    const session = await Session.findById(req.params.id);
    
    // Verifica se la sessione esiste
    if (!session) {
      return res.status(404).send("Sessione non trovata");
    }
    
    // Verifica se l'utente loggato è il creatore della sessione
    if (req.user._id.toString() !== session.creator.toString()) {
      return res.status(403).send("Solo il creatore della sessione può eliminarla");
    }

    await session.remove();
    return res.status(204).send("La sessione è stata eliminata");
  } catch (err) {
    next(err);
  }
});


/* chiamata PUT di una sessione */
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
/* richiesta PATCH per l'immagine cover del post */
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
sessionRoute.post("/:sessionId/players",  async (req, res, next) => {
  const { sessionId } = req.params;
  const { name, surname, email } = req.body;

  try {
    let user = await User.findOne({ email });

    // se il giocatore non esiste come utente  gli crea un utente
    if (!user) {
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

    // aggiungi il giocatore alla sessione
    session.players.push({ user: user._id });
    await session.save();

    // aggiungi giocare alla sessione - verifiche varie // RIMOSSO 
    // verifica che l'utente sia registrato (con password) o non registrato (senza password)
    /* if (user.password) {
      // se l'utente è registrato verifica se l'utente loggato corrisponda, tramite authMid
      if (req.user.email === user.email) {
        session.players.push({ user: user._id });
        await session.save();
        return res.status(200).send(session);
      } else {
        // L'utente autenticato non corrisponde all'utente registrato - la pass non corrisponde
        return res.status(403).send("Non hai il permesso per aggiungere questo giocatore.");
      }
    } else {
      // l'utente non è registrato (è senza password), può essere aggiunto alla sessione senza verifiche ulteriori

      session.players.push({ user: user._id });
      await session.save();
      return res.status(200).send(session);
    } */

    res.status(200).send(session);
  } catch (err) {
    next(err);
  }
});

/* rimozione giocatore */
sessionRoute.delete("/:sessionId/players/:playerId", authMid, async (req, res, next) => {
  const { sessionId, playerId } = req.params;

  try {
    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).send("Sessione non trovata");
    }

    if (req.user._id.toString() !== session.creator.toString()) {
      return res.status(403).send("Solo il creatore della sessione può rimuovere giocatori");
    }

    // Rimuovi il giocatore dalla sessione filtrando ed escludendo se uguale a playerId
    session.players = session.players.filter(player => player.user.toString() !== playerId);

    await session.save();

    return res.status(200).send(session);
  } catch (err) {
    next(err);
  }
});

