import GoogleStrategy from "passport-google-oauth20";
import User from "../models/user.model.js"
import { generateJWT } from "./index.js";
import { config } from "dotenv";

config();

const options = {
  clientID: process.env.G_CLIENT_ID,
  clientSecret: process.env.G_CLIENT_SECRET,
  callbackURL: process.env.G_CB,
};

const googleStrategy = new GoogleStrategy(
  options,
  async (_, __, profile, passportNext) => {
    try {

      const { email, given_name, family_name, sub, picture } = profile._json;

      const foundUser = await User.findOne({ email });

      // se l'utente esiste creaiamo il token, altrimenti creaimo un nuovo utente
      if (foundUser) { 

        const token = await generateJWT({
          surname: family_name,
          email: email,
        });

        passportNext(null, {token});
      } else {
        const newUser = new User({
          name: given_name,
          surname: family_name,
          email: email,
          googleid: sub,
          avatar: picture,
        });
      

      await newUser.save(); 

      const token = await generateJWT({ // e creiamo il token
        surname: family_name,
        email: email,
      });

      passportNext(null, {token})

    }
    } catch (err) {
        console.log(err); 
        passportNext(err); 
    }
  }
);

export default googleStrategy;
