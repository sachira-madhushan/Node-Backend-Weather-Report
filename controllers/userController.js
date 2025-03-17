const User = require('../models/User');
const fetchCity=require('./../utils/GoogleGeoCoding');

//@Description = "Register user"
//@Route = "/api/users/register"
//@Type = POST
const registerUser = async (req, res) => {
    try {
        const { name, email, location:{latitude,longitude} } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const cityResponse = await fetchCity(latitude, longitude);

        let city = "Unknown";
        if (cityResponse && cityResponse.results.length > 0) {
            city = cityResponse.results[4].address_components[0].long_name;
        }
        const newUser = new User({
            name,
            email,
            location:{
                latitude,
                longitude,
                city:city
            }
        
        });

        await newUser.save();

        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// @Description = "Update user location by email"
// @Route = "/api/users/update-location"
// @Type = PUT
const updateUserLocation = async (req, res) => {
    try {
        const { email,location: {latitude, longitude} } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const cityResponse = await fetchCity(latitude, longitude);
        let city = "Unknown";
        if (cityResponse && cityResponse.results.length > 0) {
            city = cityResponse.results[0].address_components[0].long_name;
        }

        user.location = { latitude, longitude, city };
        await user.save();

        res.status(200).json({ message: "Location updated successfully", user });
    } catch (error) {
        console.error("Error updating location:", error);
        res.status(500).json({ message: "Server Error" });
    }
};


module.exports = { registerUser,updateUserLocation };
