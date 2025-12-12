# ModexTix Backend API

A RESTful API for the ModexTix trip booking system built with Node.js, Express, and MongoDB.

## 📋 Table of Contents

- [Features](#features)

- [Prerequisites](#prerequisites)

- [Installation](#installation)

- [Environment Variables](#environment-variables)

- [API Endpoints](#api-endpoints)

- [Database Schema](#database-schema)

- [Running the Server](#running-the-server)

- [Testing](#testing)

- [Deployment](#deployment)

# ✨ Features

- **User Authentication**: Register, login, and JWT-based authentication

- **Trip Management**: CRUD operations for trips

- **Booking System**: Seat selection and booking confirmation

- **Admin Dashboard**: Admin-only endpoints for managing trips

- **Data Validation**: Input validation using Joi

- **Error Handling**: Centralized error handling middleware

- **CORS Support**: Cross-origin resource sharing enabled

- **Security**: Helmet for security headers, rate limiting

# 🛠 Prerequisites

- Node.js (v14 or higher)

- MongoDB (v4.4 or higher)

- npm or yarn

# 🚀 Installation

1. **Clone the repository**

```
git clone https://github.com/dhamodharanECE/Ticket-Booking-System.git
```
```
cd Ticket-Booking-System
```
# Install dependencies

bash
```
npm install
```

Set up environment variables

bash
cp .env.example .env

# Edit .env with your configuration

Start MongoDB

bash
# If using local MongoDB

mongod

Run the server

bash
```
npm start
```
# or for development
```
npm run dev
```
# 🔧 Environment Variables

Create a .env file in the root directory:

env
```
PORT=5000
```
```
MONGODB_URI=mongodb://localhost:27017/modextix
```
```
JWT_SECRET=your_jwt_secret_key_here
```
```
NODE_ENV=development
```
```
CORS_ORIGIN=http://localhost:3000
```
# 📡 API Endpoints

Authentication
```
POST /api/auth/register - Register a new user

POST /api/auth/login - User login

GET /api/auth/profile - Get user profile

POST /api/auth/logout - User logout

Trips (Shows)

GET /api/trips - Get all trips

GET /api/trips/:id - Get trip by ID

POST /api/trips - Create a new trip (Admin only)

PUT /api/trips/:id - Update a trip (Admin only)

DELETE /api/trips/:id - Delete a trip (Admin only)
```

# Bookings
```
POST /api/bookings - Create a new booking

GET /api/bookings - Get user's bookings

GET /api/bookings/:id - Get booking by ID

PUT /api/bookings/:id/cancel - Cancel a booking

Admin

GET /api/admin/trips - Get all trips with stats (Admin only)

GET /api/admin/bookings - Get all bookings (Admin only)

GET /api/admin/users - Get all users (Admin only)
```

# 🗄 Database Schema
```
User Schema
javascript

{
  name: String,
  email: String,
  password: String,
  age: Number,
  sex: String,
  bookings: [BookingRef],
  createdAt: Date,
  updatedAt: Date
}
Trip Schema
javascript
{
  name: String,
  location: String,
  startTime: Date,
  totalSeats: Number,
  bookedSeats: [Number],
  tripType: String, // 'bus', 'train', 'flight', 'cruise'
  price: Number,
  createdAt: Date,
  updatedAt: Date
}
Booking Schema
javascript
{
  user: UserRef,
  trip: TripRef,
  seats: [Number],
  totalPrice: Number,
  status: String, // 'confirmed', 'pending', 'cancelled'
  bookingDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

# 🏃 Running the Server

Development Mode

bash
```
npm run dev
```
```
Server runs at : http://localhost:5000
```
# Production Mode

bash
```
npm start
```
bash

npm run test:coverage

# 📦 Dependencies

express - Web framework

mongoose - MongoDB ODM

jsonwebtoken - JWT authentication

bcryptjs - Password hashing

cors - Cross-origin resource sharing

dotenv - Environment variables

helmet - Security headers

joi - Input validation

morgan - HTTP request logging

# 🚢 Deployment

Deployment Link:
```
    https://ticket-booking-system-1-s01t.onrender.com
```
# 📁 Project Structure

```
backend/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   └── app.js
├── tests/
├── .env
├── .gitignore
├── package.json
├── README.md
└── server.js
```
# 🔒 Security Considerations

Password hashing with bcrypt

JWT token-based authentication

Input validation and sanitization

Rate limiting on authentication endpoints

CORS configured for frontend origin

Helmet for security headers

# 🤝 Contributing

Fork the repository

Create a feature branch

Commit your changes

Push to the branch

Open a Pull Request

# 📄 License

This project is licensed under the MIT License.

# 📞 Support

For support, email support@modextix.com or create an issue in the repository.