const Winston = require('winston');
const util = require('util'); // only bringing this in to pretty up the code.

const winstonLogger = Winston.createLogger({
  transports: [
    new Winston.transports.Console({
      format: Winston.format.simple(),
    }),
  ],
});
module.exports = (req, res, next) => {
  // stated that we must log at information level.
  winstonLogger.log('info', util.format(req.currentDate, req.method, req.originalUrl, req.body, req.query, req.headers,
    req.dateValidation));
  next();
};
