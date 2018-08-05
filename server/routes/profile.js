const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");


router.get('/users',(req,res,next) => {
  User.find({}).then( user => res.status(200).json(user))
})

router.post('/valoration', (req, res, next) => {
  console.log(req.body)
  User.findById({_id:req.user._id})
  .then(user => {
    user.statisticsAverage.drive.unshift(req.body.drive)
    user.statisticsAverage.backhand.unshift(req.body.backhand)
    user.statisticsAverage.serve.unshift(req.body.serve)
    user.statisticsAverage.volley.unshift(req.body.volley)
    user.statisticsAverage.resistance.unshift(req.body.resistance)
    user.save().then(()=>{
      res.status(200).json(user)})
    
  })
  .catch( e => {
    res.status(500).json({
      status:'error',
      error:e.message
    })
   });
  });


   module.exports = router;
