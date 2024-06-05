import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import { userRoute } from "./services/routes/user.route.js";
import { sessionRoute } from "./services/routes/session.route.js";
import { authRoute } from "./services/routes/auth.route.js";
import { unauthorizedHandler,badRequestHandler, notfoundHandler, genericErrorHandler } from "./services/middlewares/errorhandler.js";
import gameRoute from "./services/routes/game.route.js";
import cors from "cors";
import passport from "passport";
import googleStrategy from "./services/auth/passport.js"
import { cityRoute } from "./services/routes/city.route.js";


config();

const app = express();

const port = process.env.PORT || 3001;

app.use(cors());

app.use(express.json())

passport.use("google", googleStrategy);

app.use("/auth", authRoute)
app.use("/user", userRoute);
app.use("/game", gameRoute)
app.use("/gamesession", sessionRoute);
app.use("/city", cityRoute)
app.use(unauthorizedHandler);
app.use(badRequestHandler);
app.use(notfoundHandler);
app.use(genericErrorHandler);

const initserver = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);

        app.listen(port, () => {
            console.log(`Listening on port ${port}`)
          })
    } catch (err) {
        console.log("Server connection failed ", err)
    }
}

initserver();