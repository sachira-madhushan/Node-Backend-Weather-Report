const axios = require('axios');

const fetchCity = async (latitude, longitude) => {
    try {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.GOOGLE_API_KEY}`;

        const response = await axios.get(url);

        return response.data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
};

module.exports = fetchCity;
