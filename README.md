# Node.js Weather Report API

## Objective
This project is a Node.js backend application that stores user emails and locations, fetches weather data, and automatically sends hourly weather reports every 3 hours.

## Features
- Store user details (email and location)
- Update user locations
- Fetch and store weather data in MongoDB
- Retrieve users’ weather data for a given day
- Send hourly weather reports via email every 3 hours
- Generate weather descriptions using OpenAI/Gemini APIs
- Convert GPS coordinates into city names using Google Cloud
- Deployable on platforms like Vercel or AWS

## Technologies Used
- **Node.js** (Express.js)
- **MongoDB** (Mongoose ORM)
- **OpenWeatherMap API** (for weather data)
- **Nodemailer** (for sending emails)
- **OpenAI/Gemini API** (for generating weather descriptions)
- **Google Cloud API** (for reverse geocoding)
- **Postman** (for API testing)
- **JWT Authentication** (for secure API access)

## Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/your-repository.git
   ```
2. Navigate into the project folder:
   ```bash
   cd your-repository
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file and add the required environment variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   OPENWEATHERMAP_API_KEY=your_openweathermap_api_key
   GOOGLE_CLOUD_API_KEY=your_google_cloud_api_key
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_password
   JWT_SECRET=your_jwt_secret
   ```
5. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

| Method | Endpoint | Description |
|--------|---------|-------------|
| **POST** | `/api/users` | Store user details (email & location) |
| **PUT** | `/api/users/:id/location` | Update user location |
| **GET** | `/api/weather/:date` | Get weather data for a given date |
| **POST** | `/api/auth/login` | Authenticate and receive a token |

## Deployment

### Deploy on Vercel
1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```
2. Deploy:
   ```bash
   vercel
   ```

### Deploy on AWS
1. Use **AWS EC2** for hosting the backend.
2. Use **MongoDB Atlas** or **AWS DocumentDB** for the database.
3. Set up an **AWS Lambda** function for the email scheduler.
4. Use **AWS SES** instead of Nodemailer for better email delivery.

## Postman Collection
A Postman API collection is provided for testing all endpoints. [Download here](#).

## License
This project is licensed under the MIT License.

---

Feel free to contribute to this project or report issues!

**Author:** [Sachira Madhushan](https://github.com/your-username)

