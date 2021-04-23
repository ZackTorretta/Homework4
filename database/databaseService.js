const User = require('../models/user');

exports.postUser = (request) => {
  try {
    return new User(request);
  } catch (e) {
    // Log Errors
    throw Error('Error while Paginating Users');
  }
};
