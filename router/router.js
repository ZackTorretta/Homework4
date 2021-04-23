const express = require('express');
const StatusCodes = require('http-status-codes');

const router = express.Router();

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
router.all('/', (req, res) => {
  const random = randomNumber(1, 2);
  // proper random function above. produces '1' 50% of the time.
  if (random === 1) {
    res.status(StatusCodes.OK).send('Hello World');
  } else {
    throw new Error('Oops');
  }
});

module.exports = router;
