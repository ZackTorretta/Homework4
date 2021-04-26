const Mongoose = require('mongoose');
// remember the SSN is unique

module.exports = Mongoose.model('Name', new Mongoose.Schema({
  name: { type: String, Required: true, unique: true },
}, {
  toJSON: {
    getters: true,
    virtuals: false,
  },
}));
