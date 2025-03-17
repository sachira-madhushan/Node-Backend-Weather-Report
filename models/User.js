const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    city: { type: String }
  },
});

module.exports = mongoose.model('User', UserSchema);
