const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");
const multer = require ("multer")
const _ = require("lodash")
const uploadCloud = require("../config/cloudinary")


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


  router.post('/update', uploadCloud.single('file'), (req,res,next) => {
    // const object = _.pickBy(req.body, (e,k) => paths.includes(k));
    const description =  req.body.description ? req.body.description : ""
    const image = req.file.url ? req.file.url : "https://e00-marca.uecdn.es/assets/multimedia/imagenes/2018/06/10/15286487701441.jpg"
    console.log(image,description,req.user._id)

    User.findByIdAndUpdate(req.user._id,{image:image,description:description}, {new:true})
        .then( obj => {
            console.log('obj')
            console.log(obj)
            res.status(200).json(obj)
        })
        .catch(e => next(e))
})



   module.exports = router;
