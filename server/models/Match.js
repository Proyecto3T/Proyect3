const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const matchSchema = new Schema({
  players: [{type: Schema.Types.ObjectId, ref:"User"}],
  date: {type: Date, default: Date.now()},
  place: String,
  result: String,
  finish: {type: boolean, default:false}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Match = mongoose.model('Match', matchSchema);
module.exports = Match;