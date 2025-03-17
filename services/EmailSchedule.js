const cron = require("node-cron");
const User = require("./models/User");
const fetchWeather = require("./utils/fetchWeather");
const generateAIResponse = require("./utils/generativeAI");
const sendWeatherReport = require("./utils/emailService");

cron.schedule("0 */3 * * *", async () => {
  console.log("⏳ Running scheduled bulk weather email task...");

  try {
    const users = await User.find();
    const emails = users.map((user) => user.email).filter((email) => email);

    if (emails.length === 0) {
      console.log("⚠️ No users with valid emails found.");
      return;
    }


    const firstUser = users.find((user) => user.location);
    if (!firstUser) {
      console.log("⚠️ No user with a valid location found.");
      return;
    }

    const weatherResponse = await fetchWeather(
      firstUser.location.latitude,
      firstUser.location.longitude
    );

    const AIWeatherReport = await generateAIResponse(weatherResponse, firstUser);


    const emailSent = await sendWeatherReport(
      emails,
      "📢 AI-Generated Weather Report 🌦️",
      AIWeatherReport
    );

    if (emailSent) {
      console.log(`✅ Weather report sent to ${emails.length} users.`);
    } else {
      console.error("❌ Failed to send bulk email.");
    }
  } catch (error) {
    console.error("❌ Error in scheduled task:", error);
  }
});

console.log("✅ Bulk weather email sheduler is running...");
