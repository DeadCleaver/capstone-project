import { Schema, model } from "mongoose";

const sessionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    creator: {
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    },
    maxplayers: {
      type: Number,
      required: true,
    },
    minplayers: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true
    },
    cover: {
      type: String,
      required: false
    },
    players: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: false,
        },
      },
    ],
  },
  {
    collection: "sessions",
  }
);

export default model("Session", sessionSchema);
