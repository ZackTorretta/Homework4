const StatusCodes = require('http-status-codes');

// used the rules in eslintrc to remove the next error
module.exports = (err, req, res, next) => {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`We're sorry, the error was: ${err.message}`);
};
