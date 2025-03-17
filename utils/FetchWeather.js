const axios = require('axios');

const fetchWeather = async (latitude, longitude) => {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.OPENWEATHERMAP_API_KEY}&units=metric`;

        const response = await axios.get(url);

        return response.data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
};

module.exports = fetchWeather;
