const User = require('../models/user');
const userRouter = require('express').Router();
const bcrypt = require('bcrypt');

userRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    url: 1,
    author: 1
  });
  response.json(users);
});

userRouter.post('/', async (request, response) => {
  const { username, password, name } = request.body;

  if (!password || password.length < 3) {
    return response.status(400).send({
      error: 'Password is missing or password is invalid'
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    passwordHash,
    name
  });

  const savedUser = await user.save();
  response.status(201).json(savedUser);
});

module.exports = userRouter;
