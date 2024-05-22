import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { config } from "dotenv";

config();

// genera un token con JWT
export const generateJWT = (payload) => {
  return new Promise((res, rej) =>
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1 day" },
      (err, token) => {
        if (err) rej(err);
        else res(token);
      }
    )
  );
};

// verifica validità del token JWT fornito
export const verifyJWT = (token) => {
  return new Promise((res, rej) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        rej(err);
      } else {
        res(decoded);
      }
    });
  });
};

// Middleware per richieste che richiedono auth
export const authMid = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      res.status(401).send("Effettua il login");
    } else {
      const decoded = await verifyJWT(
        req.headers.authorization.replace("Bearer ", "")
      );

      if (decoded.exp) {
        delete decoded.iat;
        delete decoded.exp;
        const me = await User.findOne({
          ...decoded,
        });

        if (me) {
          req.user = me;
          next();
        } else {
          res.status(401).send("Utente non trovato");
        }
      } else {
        res.status(401).send("Eddettua di nuovo il login");
      }
    }
  } catch (err) {
    next(err);
  }
};
