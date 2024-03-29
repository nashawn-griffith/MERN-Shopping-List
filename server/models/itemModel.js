const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
  name: {type: String, required: true},
  date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('item', itemSchema);
