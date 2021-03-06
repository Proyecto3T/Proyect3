const express = require('express');
const passport = require('passport');

const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Bcrypt to encrypt passwords
const bcryptSalt = 10;

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
    // Check for errors
    if (err) next(new Error('Something went wrong'));
    if (!theUser) next(failureDetails);

    // Return user and logged in
    login(req, theUser).then(user => res.status(200).json(req.user));
  })(req, res, next);
});

const login = (req, user) => new Promise((resolve, reject) => {
  req.login(user, (err) => {
    if (err) {
      reject(new Error('Something went wrong'));
    } else {
      resolve(user);
    }
  });
});

router.post('/signup', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  if (username === '' || password === '' || email === '') {
    next(new Error('You must provide valid credentials'));
  }

  User.findOne({ username })
    .then((foundUser) => {
      if (foundUser) throw new Error('Username already exists');

      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);

      return new User({
        username,
        password: hashPass,
        email,
      }).save();
    })
    .then(savedUser => login(req, savedUser)) // Login the user using passport
    .then(user => res.json({ status: 'signup & login successfully', user })) // Answer JSON
    .catch(e => next(e));
});

router.get('/currentuser', (req, res, next) => {
  if (req.user) {
    res.status(200).json(req.user);
  } else {
    next(new Error('Not logged in'));
  }
});
router.get('/logout', (req, res) => {
  req.logout();
  res.status(200).json({ message: 'logged out' });
});

router.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

router.post('/notify/:id', (req, res, next) => {
  console.log(req.body.notification, req.params.id);

  User.findByIdAndUpdate(
    { _id: req.params.id },
    { $push: { notifications: req.body.notification } },
    { new: true },
  ).then((user) => {
    console.log(user);
    return res.status(201).json(user);
  });
});
router.get('/logout', (req, res) => {
  req.logout();
  res.status(200).json({ message: 'logged out' });
});

router.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

// listModel.findByIdAndUpdate(list,{ $push:{cards: card._id }})
// 			.then(list=>{
// 			return res.status(201).json(card);
// 		});
module.exports = router;
