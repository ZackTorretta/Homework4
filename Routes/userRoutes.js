const express = require('express');

const router = express.Router();
const controller = require('../Controller/userController');

router.get('/', (req, res) => {
  res.sendFile('C:\\Users\\Zack\\Desktop\\WebServer\\Homework4\\src/index.html');
});
router.post('/submit', controller.postUser);
module.exports = router;

//   /users/123
