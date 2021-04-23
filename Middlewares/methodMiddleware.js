const StatusCodes = require('http-status-codes');

module.exports = (req, res, next) => {
  if (req.method === 'DELETE') {
    res.sendStatus(StatusCodes.METHOD_NOT_ALLOWED);
  } else {
    next();
  }
};
