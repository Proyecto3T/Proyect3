const express = require("express");
const passport = require("passport");
const router = express.Router();
const Match = require("../models/Match");


//Match.find({ roomId: { $in: [req.params.id] } })

router.get('/', (req, res, next) => {
  Match.find({})
  .populate("_author")
    .then(matches => {
      res.status(200).json(matches);
    })
    .catch( e => {
      res.status(500).json({
        status:'error',
        error:e.message
      })
    })
});

router.get('/finish-matches', (req, res, next) => {
  let date = new Date();
  Match.find({"finish": {"$gt": ("2010-01-01 13:39:35.039"), "$lt" : (`${date}`) }})
  .populate("_author")
    .then(matches => {
      res.status(200).json(matches);
    })
    .catch( e => {
      res.status(500).json({
        status:'error',
        error:e.message
      })
    })
});

router.get('/:id', (req, res, next) => {
  const playerId = req.params.id
  Match.find({ players: { $elemMatch: { $eq: playerId} } })
  .populate("_author")
    .then(matches => {
      res.status(200).json(matches);
    })
    .catch( e => {
      res.status(500).json({
        status:'error',
        error:e.message
      })
    })
});

router.post('/new', (req, res, next) => {
  let players = []
  players.push(req.user._id)
  const location ={
    type: "Point",
    coordinates: [Number(req.body.lat), Number(req.body.lng)]
}
  const newMatch = new Match({
    _author: req.user._id,
    players,
    hour: req.body.hour,
    date: req.body.date,
    location
  });

  newMatch.save((err) => {
    if (err)              { return res.status(500).json(err); }
    if (newMatch.errors) { return res.status(400).json(newMatch); }

    return res.status(200).json(newMatch);
  });
});

router.get('/single-match/:id', (req, res, next) => {
  const matchId = req.params.id
  Match.findById(matchId)
  .populate("_author")
    .then(match => {
      res.status(200).json(match);
    })
    .catch( e => {
      res.status(500).json({
        status:'error',
        error:e.message
      })
    })
});


module.exports = router;