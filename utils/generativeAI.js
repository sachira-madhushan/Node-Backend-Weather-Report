const axios = require('axios');
const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");


const MODEL_NAME = "gemini-2.0-flash";
const API_KEY = process.env.GEMINI_API_KEY;

const generateAIResponse = async (weather, user) => {

    const prompt = `
        This is detail about the user ${user},
        This is the details about the weather relavent to this user and location ${weather}.
        Provide a personalized weather report in a friendly tone.And add important details like today weather in small text like rainy like wise and temparature like wise imposrtant details in separately. Think you as our weather agent. Send response as you telling the user to about the weather.
    `;

    try {
        if (!prompt) {
          return res.status(400).json({ error: "Invalid request body" });
        }
    
        const genAI = new GoogleGenerativeAI(API_KEY);
    
        const model = await genAI.getGenerativeModel({ model: MODEL_NAME });

        const result = await model.generateContent(prompt);
        return result.response.text().replace(/\*\*(.*?)\*\*/g, "")
        .replace(/\*/g, "");


      } catch (error) {
        return null;
        
      }

}

module.exports = generateAIResponse;