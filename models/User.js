const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    city: { type: String }
  },
  weatherData: [
    {
      temperature: Number,
      condition: String,
      date: Date
    }
  ]
});

module.exports = mongoose.model('User', UserSchema);
