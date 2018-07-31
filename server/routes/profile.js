const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");

router.post('/valoration', (req, res, next) => {
  
  User.findByIdAndUpdate({id:req.user._id},{statisticsAverage:drive.push(req.body.drive)},{statisticsAverage:backhand.push(req.body.backhand)},{statisticsAverage:serve.push(req.body.serve)},{statisticsAverage:volley.push(req.body.volley)},{statisticsAverage:resistance.push(req.body.resistance)})
  .then(user => {
    console.log(user)
    res.status(200).json(user);
  })
  .catch( e => {
    res.status(500).json({
      status:'error',
      error:e.message
    })
   });
  });


   module.exports = router;
