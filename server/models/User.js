const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  email:String,
  comments:[{type:Schema.Types.ObjectId, ref: 'Comments'}],
  statistics:{
    drive: {type:Number, default:5},
    backhand: {type:Number, default:5},
    serve: {type:Number, default:5},
    volley: {type:Number, default:5},
    resistance: {type:Number, default:5}
  },
  statisticsAverage:{
    drive: [{type:Number, default:5}],
    backhand: [{type:Number, default:5}],
    serve: [{type:Number, default:5}],
    volley: [{type:Number, default:5}],
    resistance: [{type:Number, default:5}]
  },
  points:{type:Number, default:0},
  league:{type: String, default: "0"}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
