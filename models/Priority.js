const mongoose = require('mongoose');

const PrioritySchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  }
});

const priority = mongoose.model('priority', PrioritySchema);

module.exports = priority;