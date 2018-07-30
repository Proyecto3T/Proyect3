const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  comments:[{type:Schema.Types.ObjectId, ref: 'Comments'}],
  matches:[{type:Schema.Types.ObjectId, ref: 'Match'}],
  statistics:{
    drive: {type:Number, default:0},
    backhand: {type:Number, default:0},
    serve: {type:Number, default:0},
    volley: {type:Number, default:0},
    resistance: {type:Number, default:0}
  },
  points:Number,
  league:String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
