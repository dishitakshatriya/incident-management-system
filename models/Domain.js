const mongoose = require('mongoose');

const DomainSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

const domain = mongoose.model('domain', DomainSchema);

module.exports = domain;