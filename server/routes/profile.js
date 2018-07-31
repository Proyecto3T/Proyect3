const express = require("express");
const router = express.Router();
const User = require("../models/User");


router.post("/valoration", (req, res, next) => {
     const {Drive, Backhand, Serve, Volley, Resistance}= req.params;
     const user = req.user;
     console.log(req.params)
     console.log(req.user)


   });


   module.exports = router;
