const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  email:String,
  image:{type:String, default:"https://e00-marca.uecdn.es/assets/multimedia/imagenes/2018/06/10/15286487701441.jpg"},
  description:{type:String, default:""},
  wonMatches:{type:Number,default:0},
  lostMatches:{type:Number,default:0},
  comments:[{type:Schema.Types.ObjectId, ref: 'Comments'}],
  statisticsAverage:{
    drive: [{type:Number, default:5}],
    backhand: [{type:Number, default:5}],
    serve: [{type:Number, default:5}],
    volley: [{type:Number, default:5}],
    resistance: [{type:Number, default:5}]
  },
  valorated:[String],
  points:{type:Number, default:0},
  league:{type: String, default: "0"},
  notifications: [],
    
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
