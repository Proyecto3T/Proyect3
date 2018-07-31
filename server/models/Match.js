const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const matchSchema = new Schema(
  {
    _author: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    players: [{ type: Schema.Types.ObjectId, ref: "User" }],
    date: { type: Date, default: Date.now() },
    hour: String,
    location: {
      type: {
        type: String
      },
      coordinates: [Number]
    },
    result: String,
    winner: { type: Schema.Types.ObjectId, ref: "User" },
    loser: { type: Schema.Types.ObjectId, ref: "User" },
    finish: { type: Boolean, default: false }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Match = mongoose.model("Match", matchSchema);
module.exports = Match;
