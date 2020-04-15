const mongoose = require('mongoose');

const StatusSchema = new mongoose.Schema({
  status: {
    type: String,
    required: true
  }
});

const status = mongoose.model('status', StatusSchema);

module.exports = status;