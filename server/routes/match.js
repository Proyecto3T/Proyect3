const express = require("express");
const passport = require("passport");
const router = express.Router();
const Match = require("../models/Match");
const User = require("../models/User");
const transport = require("../mailing/transport");
const winnerTemplate = require("../mailing/templates");
const loserTemplate = require("../mailing/templates");
//Match.find({ roomId: { $in: [req.params.id] } })

router.get("/", (req, res, next) => {
  Match.find({})
    .populate("_author")
    .then(matches => {
      res.status(200).json(matches);
    })
    .catch(e => {
      res.status(500).json({
        status: "error",
        error: e.message
      });
    });
});

router.get("/finish-matches", (req, res, next) => {
  let date = new Date();
  Match.find({
    finish: {
      $gt: "2010-01-01 13:39:35.039",
      $lt: `${date.getTime()}`
    }
  })
    .populate("_author")
    .then(matches => {
      res.status(200).json(matches);
    })
    .catch(e => {
      res.status(500).json({
        status: "error",
        error: e.message
      });
    });
});

router.get("/:id", (req, res, next) => {
  const playerId = req.params.id;
  Match.find({
    ended: false,
    players: {
      $elemMatch: {
        $eq: playerId
      }
    }
  })
    .populate("_author")
    .populate("players")
    .then(matches => {
      res.status(200).json(matches);
    })
    .catch(e => {
      res.status(500).json({
        status: "error",
        error: e.message
      });
    });
});

router.post("/new", (req, res, next) => {
  let players = [];
  players.push(req.user._id);
  const location = {
    type: "Point",
    coordinates: [Number(req.body.lat), Number(req.body.lng)]
  };
  const newMatch = new Match({
    _author: req.user._id,
    players,
    hour: req.body.hour,
    date: req.body.date,
    location
  });

  newMatch.save(err => {
    if (err) {
      return res.status(500).json(err);
    }
    if (newMatch.errors) {
      return res.status(400).json(newMatch);
    }

    return res.status(200).json(newMatch);
  });
});
router.post("/addPlayer/:playerId/:matchId", (req, res, next) => {
  Match.findByIdAndUpdate(
    req.params.matchId,
    {
      $push: {
        players: req.params.playerId
      },
      closed: true
    },
    {
      new: true
    }
  )
    .then(match => {
      console.log(match);
      res.status(200).json(match);
    })
    .catch(e => {
      res.status(500).json({
        status: "error",
        error: e.message
      });
    });
});

router.get("/single-match/:id", (req, res, next) => {
  const matchId = req.params.id;
  Match.findById(matchId)
    .populate("_author")
    .then(match => {
      res.status(200).json(match);
    })
    .catch(e => {
      res.status(500).json({
        status: "error",
        error: e.message
      });
    });
});

router.get("/delete/:id", (req, res) => {
  Match.findByIdAndRemove(req.params.id).then(e =>
    res.status(200).json({
      message: "Match removed successfully!"
    })
  );
});

router.post("/endMatch/:matchId", (req, res) => {
  Match.findByIdAndUpdate(
    req.params.matchId,
    {
      winner: req.body.winner,
      loser: req.body.loser,
      ended: true,
      finish: new Date()
    },
    {
      new: true
    }
  )
    .then(e => {
      res.status(200).json(e);
    })
    .catch(e => {
      res.status(500).json({
        status: "error",
        error: e.message
      });
    });
});

router.post("/winnerEndMatch", (req, res) => {
  User.findById({ _id: req.body.winner })
    .then(user => {
      user.wonMatches++;
      user.save().then(() => {
        transport
          .sendMail({
            to: user.email,
            subject: "Head2Head",
            text: "Hola",
            html: winnerTemplate(user.username, "Papu")
          })
          .then(() => res.status(200).json(user));
      });
    })
    .catch(e => {
      console.log(e);
      res.status(500).json({
        status: "error",
        error: e.message
      });
    });
});

router.post("/loserEndMatch", (req, res) => {
  console.log(req.body);
  User.findById({ _id: req.body.loser })
    .then(user => {
      user.lostMatches++;
      user.save().then(() => {
        transport
          .sendMail({
            to: user.email,
            subject: "Head2Head",
            text: "Hola",
            html: loserTemplate("Papu", user.username)
          })
          .then(() => res.status(200).json(user));
      });
    })
    .catch(e => {
      console.log(e);
      res.status(500).json({
        status: "error",
        error: e.message
      });
    });
});

router.get("/record/:id", (req, res, next) => {
  playerId = req.params.id;
  Match.find({
    ended: true,
    players: {
      $elemMatch: {
        $eq: playerId
      }
    }
  })
    .populate("_author")
    .then(matches => {
      console.log(matches);
      res.status(200).json(matches);
    })
    .catch(e => {
      res.status(500).json({
        status: "error",
        error: e.message
      });
    });
});

router.get;
module.exports = router;
