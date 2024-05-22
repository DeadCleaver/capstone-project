import { Schema, model } from "mongoose";

const gameSchema = new Schema(
    {
            gametitle: {
              type: String,
              required: true
            },
            gamedescription: {
                type: String,
                required: false
            }
          },
          {
            collection: "games",
          }
        );
        
        export default model("Game", gameSchema);