# Portfolio Backend API

A production-ready backend API for a personal portfolio website built with Node.js, Express, and TypeScript.

## 🚀 Features

- **TypeScript** - Type-safe code with modern ES features
- **Express.js** - Fast and minimalist web framework
- **CORS** - Configured for frontend integration
- **Environment Configuration** - Secure config management with dotenv
- **Clean Architecture** - Organized folder structure for scalability
- **Error Handling** - Centralized error handling middleware
- **Health Check** - API status endpoint

## 📁 Project Structure

```
portfolio-backend/
├── src/
│   ├── config/           # Configuration files
│   │   └── index.ts      # Environment variables config
│   ├── controllers/      # Request handlers
│   │   └── healthController.ts
│   ├── middlewares/      # Custom middleware
│   │   └── errorHandler.ts
│   ├── routes/           # API routes
│   │   └── index.ts
│   ├── app.ts            # Express app setup
│   └── server.ts         # Server entry point
├── .env                  # Environment variables (not in git)
├── .env.example          # Environment variables template
├── .gitignore           # Git ignore rules
├── package.json         # Dependencies and scripts
└── tsconfig.json        # TypeScript configuration
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js >= 18.0.0
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   - Copy `.env.example` to `.env`
   - Update values as needed:
     ```
     PORT=5000
     NODE_ENV=development
     FRONTEND_URL=http://localhost:3000
     ```

3. **Run in development mode:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Start production server:**
   ```bash
   npm start
   ```

## 📡 API Endpoints

### Health Check
- **URL:** `/api/health`
- **Method:** `GET`
- **Response:**
  ```json
  {
    "status": "ok",
    "message": "Portfolio API is running",
    "timestamp": "2026-02-04T11:26:55.000Z",
    "environment": "development"
  }
  ```

### Contact Form
- **URL:** `/api/contact`
- **Method:** `POST`
- **Content-Type:** `application/json`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "message": "Hello, I would like to get in touch!"
}
```

**Validation Rules:**
- All fields (`name`, `email`, `phone`, `message`) are required
- All fields must be non-empty strings (not just whitespace)
- `email` must be a valid email format
- `name` must be less than 100 characters
- `phone` must be less than 20 characters
- `message` must be less than 1000 characters

**Success Response (200):**
```json
{
  "success": true,
  "message": "Message received successfully"
}
```

**Error Response (400):**
```json
{
  "success": false,
  "error": "Please provide a valid email address"
}
```

**Example using fetch:**
```javascript
fetch('http://localhost:5000/api/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    message: 'Hello, I would like to get in touch!'
  })
})
  .then(response => response.json())
  .then(data => console.log(data));
```


## 🔧 Available Scripts

- `npm run dev` - Start development server with auto-reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run production server
- `npm run clean` - Remove build directory

## 🌐 Deployment (Render)

### Steps to deploy on Render:

1. Push your code to GitHub
2. Create a new Web Service on Render
3. Connect your repository
4. Configure:
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Environment:** Node
5. Add environment variables in Render dashboard:
   - `NODE_ENV=production`
   - `FRONTEND_URL=https://your-frontend-url.com`
   - `PORT` (Render sets this automatically)

## 📝 Future Enhancements

- MongoDB Atlas integration (save contact form data)
- Email service integration (send notifications via Nodemailer)
- Project data endpoints
- Authentication (if needed)

## 👨‍💻 Author

Abhinandan Kumar

## 📄 License

MIT
