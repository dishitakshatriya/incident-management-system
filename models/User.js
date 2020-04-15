const mongoose = require('mongoose');


const userteamSchema = new mongoose.Schema({
  Name: {
      type: String,
      required: true
    }
});

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  userteamName:{
    userteamSchema
  }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;