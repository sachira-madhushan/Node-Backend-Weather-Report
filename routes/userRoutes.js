const express = require('express');
const { registerUser,updateUserLocation, getWeather, getAIWeather, loginUser } = require('../controllers/UserController');
const authMiddleware = require("./../middleware/authMiddleware");
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/weather',authMiddleware, getWeather);
router.post('/ai-report',authMiddleware, getAIWeather);
router.put('/update-location',authMiddleware,updateUserLocation);

module.exports = router;
