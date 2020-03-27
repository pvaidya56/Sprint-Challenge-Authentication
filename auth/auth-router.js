const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/secrets.js');
const Users = require('./db-model.js');

router.post('/register', (req, res) => {
  // implement registration
  const userInfo = req.body;
  const hash = bcrypt.hashSync(userInfo.password, 10);

  userInfo.password = hash;

  Users.add(userInfo)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({ err: "Error registering user" });
    });
});

router.post('/login', (req, res) => {
  // implement login
  const { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if(user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(201).json({ welcome: user.username, token });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "Error finding user", err: err });
    });
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    role: user.role || 'user'
  };

  const options = {
    expiresIn: '1hr'
  };

  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
