const app = require('express')();

const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = process.env.PORT || 3000;
const Mongoose = require('mongoose');
require('dotenv/config');

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
  http.listen(port, () => {
    console.log(`Socket.IO server running at http://localhost:${port}/`);
  });
})();
// need http.listen not app.listen.
// restyle SP2 to use mongo DB with http like this.
// add to database via post LIKE THIS assignment with web page at least.
// web page post at least. into get info and then display that info on browser for sp2
