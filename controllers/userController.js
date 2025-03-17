const User = require('../models/User');
const fetchCity=require('./../utils/GoogleGeoCoding');
const fetchWeather=require('./../utils/FetchWeather');
const generateAIResponse = require('../utils/generativeAI');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//@Description = "Register user"
//@Route = "/api/users/register"
//@Type = POST
const registerUser = async (req, res) => {
    try {
        const { name, email,password, location:{latitude,longitude} } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const cityResponse = await fetchCity(latitude, longitude);
        const hashedPassword = await bcrypt.hash(password, 10); 

        let city = "Unknown";
        if (cityResponse && cityResponse.results.length > 0) {
            city = cityResponse.results[4].address_components[0].long_name;
        }
        const newUser = new User({
            name,
            email,
            password:hashedPassword,
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
        const {email}=req.user;
        const {location: {latitude, longitude} } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const cityResponse = await fetchCity(latitude, longitude);
        let city = "Unknown";
        if (cityResponse && cityResponse.results.length > 0) {
            city = cityResponse.results[4].address_components[0].long_name;
        }

        user.location = { latitude, longitude, city };
        await user.save();

        user.toObject();

        delete user.password;

        res.status(200).json({ message: "Location updated successfully", user });
    } catch (error) {
        console.error("Error updating location:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// @Description = "Get relavent user's weather using email"
// @Route = "/api/users/weather"
// @Type = POST
const getWeather=async(req,res)=>{
    try {
        const { email} = req.user;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const weatherResponse = await fetchWeather(user.location?.latitude, user.location?.longitude);

        return res.status(200).json({message:"Weather Report",user:user,weather:weatherResponse});


    } catch (error) {
        
    }
}

// @Description = "Get relavent user's weather using email and generate report with Gemini AI"
// @Route = "/api/users/ai-report"
// @Type = POST
const getAIWeather=async(req,res)=>{
    try {
        const { email} = req.user;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const weatherResponse = await fetchWeather(user.location?.latitude, user.location?.longitude);

        const AIWeatherReport=await generateAIResponse(weatherResponse,user);
        
        return res.status(200).json({message:"AI Weather Report",user:user,weather:AIWeatherReport });


    } catch (error) {
        return res.status(500).json({message:"Error while generating report"});
    }
}


// @Description = "User login with password validation"
// @Route = "/api/users/login"
// @Type = POST
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

       
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "3h" }
        );

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};


module.exports = { registerUser,updateUserLocation,getWeather,getAIWeather,loginUser};
