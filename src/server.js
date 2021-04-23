const app = require('express')();
const Mongoose = require('mongoose');
const http = require('http').Server(app);
const io = require('socket.io')(http);
require('dotenv/config');

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});
(async () => {
  await Mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  app.listen(port);
})();
