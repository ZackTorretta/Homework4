const express = require('express');
const BodyParser = require('body-parser');
const Mongoose = require('mongoose');
const methodMiddleware = require('../Middlewares/methodMiddleware');
const dateValidation = require('../Middlewares/dateValidation');
const logger = require('../Middlewares/logger');
const router = require('../router/router');
const error = require('../errorHandlers/errorHandler');
require('dotenv/config');

const app = express();
app.use(BodyParser.json());
app.use(methodMiddleware);
app.use(dateValidation);
app.use(logger);
app.use(router);
app.use(error);
(async () => {
  await Mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  app.listen(8080);
})();
