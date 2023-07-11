const config = require('./utils/config');
const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const { info, error } = require('./utils/logger');

const blogsRouter = require('./controls/blogs');
const middleware = require('./utils/middleware');
const userRouter = require('./controls/users');
const loginRouter = require('./controls/login');

mongoose.set('strictQuery', false);

info('connecting to mongo DB...');
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    info('connected to mongo DB');
  })
  .catch((err) => error(err));

app.use(cors());
app.use(express.json());
app.use(middleware.userExtractor);

app.use('/api/blogs', blogsRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);

app.use(middleware.errorHandler);

module.exports = app;
