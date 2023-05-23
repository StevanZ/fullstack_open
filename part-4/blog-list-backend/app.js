const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/config');
const { info, error } = require('./utils/logger');
const middleware = require('./')
const blogsRouter = require('./controls/blogs');

info('connecting to mongo DB...');
mongoose
  .connect(config.MONGODB_URI)
  .then((resp) => {
    info('conected to mongo DB');
  })
  .catch((err) => error(err));

app.use(cors());
app.use(express.json());

app.use('/api/blogs/', blogsRouter);

module.exports = app;
