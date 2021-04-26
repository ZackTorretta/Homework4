const express = require('express');

const app = express();
const http = require('http');

const server = http.createServer(app);
const { Server } = require('socket.io');

const io = new Server(server);
const BodyParser = require('body-parser');
const Mongoose = require('mongoose');
const User = require('../models/user');

const port = 3000;
require('dotenv/config');

app.use(BodyParser.urlencoded({
  extended: true,
}));
app.use(BodyParser.json());
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});
app.post('/', (req, res) => {
  const user = new User(req.body);
  user.save()
    .then(() => {
      res.redirect('/');
    })
    .catch((e) => {
      res.sendStatus(
        e.code === 11000
        || e.stack.includes('ValidationError')
        || (e.reason !== undefined && e.reason.code === 'ERR_ASSERTION')
          ? 400 : 500,
      );
    });
});
io.on('connection', (socket) => {
  socket.on('', (msg) => {
    User.find({ name: new RegExp(msg, 'i') }, (err, docs) => {
      // IMPORTANT NOTE: this is for if it CONTAINS something. Not if it STARTS with something
      // no previous bullets are required to be cleared. They will continue being displayed.
      // However, of course it will clear the page once submit is pressed.
      io.emit('', docs);
    });
  });
});
(async () => {
  await Mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  server.listen(port, () => {
  });
})();
// need http.listen not app.listen.
// restyle SP2 to use mongo DB with http like this.
// add to database via post LIKE THIS assignment with web page at least.
// web page post at least. into get info and then display that info on browser for sp2
