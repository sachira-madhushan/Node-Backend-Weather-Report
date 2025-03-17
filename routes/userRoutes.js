const express = require('express');
const { registerUser,updateUserLocation, getWeather, getAIWeather } = require('../controllers/UserController');
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post('/register', registerUser);
router.post('/weather',authMiddleware, getWeather);
router.post('/ai-report',authMiddleware, getAIWeather);
router.put('/update-location',authMiddleware,updateUserLocation);

module.exports = router;
