const express = require('express');
const { registerUser,updateUserLocation, getWeather, getAIWeather } = require('../controllers/UserController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/weather', getWeather);
router.post('/ai-report', getAIWeather);
router.put('/update-location',updateUserLocation);

module.exports = router;
