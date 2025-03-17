const express = require('express');
const { registerUser,updateUserLocation } = require('../controllers/UserController');

const router = express.Router();

router.post('/register', registerUser);
router.put('/update-location',updateUserLocation);

module.exports = router;
