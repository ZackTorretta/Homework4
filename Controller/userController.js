const User = require('../database/databaseService');
require('../Routes/userRoutes');

exports.postUser = async (request, response) => {
  console.log('inside post');
  console.log(request.body);
  const user = User.postUser(request.body); // not entire request, just body.
  user.save()
    .then(() => {
      console.log('inside save');
      response.redirect('/');
    })
    .catch((e) => {
      console.log('inside err');
      response.sendStatus(
        e.code === 11000
        || e.stack.includes('ValidationError')
        || (e.reason !== undefined && e.reason.code === 'ERR_ASSERTION')
          ? 400 : 500,
      );
    });
};
