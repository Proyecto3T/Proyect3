const express = require("express");
const passport = require("passport");
const router = express.Router();
const Match = require("../models/Match");

//Match.find({ roomId: { $in: [req.params.id] } })

router.get('/:id', (req, res, next) => {
  const playerId = req.params.id
  Match.find({ players: { $elemMatch: { $eq: playerId} } })
  .populate("_author")
    .then(matches => {
      console.log(matches)
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

module.exports = router;