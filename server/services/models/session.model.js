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
    game: {
      type: Schema.Types.ObjectId,
      ref: 'Game',
      required: true
    }, 
    city: {
      type: Schema.Types.ObjectId,
      ref: 'City',
      required: false
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
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: false,
      },
    ],
  },
  {
    collection: "sessions",
  }
);

export default model("Session", sessionSchema);
