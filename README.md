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


# ModexTix Frontend

A modern trip booking web application built with React and Tailwind CSS.

# 📋 Table of Contents

- [Features](#features)

- [Live Demo](#live-demo)

- [Screenshots](#screenshots)

- [Prerequisites](#prerequisites)

- [Installation](#installation)

- [Project Structure](#project-structure)

- [Available Scripts](#available-scripts)

- [Environment Variables](#environment-variables)

- [Components](#components)

- [Pages](#pages)

- [Styling](#styling)

- [State Management](#state-management)

- [API Integration](#api-integration)

- [Deployment](#deployment)

- [Contributing](#contributing)


# ✨ Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS

- **User Authentication**: Login and registration with form validation

- **Trip Browsing**: Filter and search available trips

- **Seat Selection**: Interactive seat grid with real-time availability

- **Booking System**: Complete booking flow with confirmation

- **Admin Dashboard**: Create and manage trips (Admin only)

- **User Bookings**: View and manage personal bookings

- **Real-time Updates**: Seat availability updates in real-time

- **Modern UI**: Clean, modern interface with smooth animations

# 🌐 Live Demo



#  📸 Screenshots
[Home Page](![alt text](image.png))
![Booking Page](![alt text](image-1.png))
![Admin Dashboard](![alt text](image-2.png))

# 🛠 Prerequisites

- Node.js (v14 or higher)

- npm or yarn

- Backend server running (see backend README)

#b🚀 Installation

1. **Clone the repository**

```
git clone https://ticket-booking-system-1-s01t.onrender.com
```

cd Ticket-Booking-System/frontend

Install dependencies

bash
```
npm install
```
# or
```
yarn install
```
Set up environment variables

bash
cp .env.example .env

# Edit .env with your backend API URL

Start the development server

bash
```
npm start
```
# or
```
yarn start
```
Open in browser
```
Navigate to http://localhost:3000
```
# 📁 Project Structure

text
```
frontend/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.js
│   │   │   └── Footer.js
│   │   ├── booking/
│   │   │   ├── SeatGrid.js
│   │   │   ├── BookingModal.js
│   │   │   └── BookingStatus.js
│   │   └── layout/
│   │       └── Card.js
│   ├── pages/
│   │   ├── Home.js
│   │   ├── Login.js
│   │   ├── Register.js
│   │   ├── BookingPage.js
│   │   ├── AdminDashboard.js
│   │   └── Bookings.js
│   ├── context/
│   │   ├── AuthContext.js
│   │   ├── ShowsContext.js
│   │   └── BookingContext.js
│   ├── services/
│   │   └── api.js
│   ├── utils/
│   │   └── helpers.js
│   ├── assets/
│   │   ├── images/
│   │   └── styles/
│   ├── App.js
│   ├── App.css
│   └── index.js
├── .env
├── .gitignore
├── package.json
├── tailwind.config.js
├── README.md
└── public/
```
# 📜 Available Scripts
```
npm start
```

Runs the app in development mode at 
```
http://localhost:3000.
```
```
npm test
```
Launches the test runner in interactive watch mode.
```
npm run build
```
Builds the app for production to the build folder.
```
npm run eject
```
Note: this is a one-way operation. Once you eject, you can't go back!
```
npm run lint
```
Runs ESLint to check for code quality issues.

npm run format

Formats code using Prettier.

# 🔧 Environment Variables

Create a .env file in the root directory:

env
```
REACT_APP_API_URL=http://localhost:5000/api
```
```
REACT_APP_USE_MOCK_API=true
```
```
REACT_APP_SITE_NAME=ModexTix
```
# 🎨 Components

# Core Components

Navbar: Responsive navigation bar with user menu

ShowCard: Trip card displaying trip information

SeatGrid: Interactive seat selection grid

BookingModal: Modal for completing bookings

BookingStatus: Status display for bookings

# Layout Components

Card: Reusable card component

Button: Custom button components

Input: Form input components

Modal: Reusable modal component

# 📄 Pages

1. Home Page (/home)

Browse available trips

Filter by date and availability

Search for specific trips

View trip details

2. Login Page (/login)

User authentication

Demo login support

Form validation

3. Register Page (/register)

New user registration

Form validation

Terms and conditions

4. Booking Page (/booking/:id)

Seat selection interface

Booking summary

Payment information

Booking confirmation

5. Admin Dashboard (/admin)

Create new trips

View all trips

Manage trip details

Booking statistics

6. User Bookings (/bookings)

View personal bookings

Booking history

Trip location and date information

# 🎨 Styling

Tailwind CSS: Utility-first CSS framework

Responsive Design: Mobile-first responsive layouts

Animations: Smooth transitions and hover effects

Icons: React Icons library

Custom Components: Reusable styled components

Tailwind Configuration

javascript

// tailwind.config.js
```
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#8B5CF6',
      },
    },
  },
  plugins: [],
}
```

# 🗂 State Management

Context API

AuthContext: Manages user authentication state

ShowsContext: Manages trips/shows data

BookingContext: Manages booking process

Local State

React hooks (useState, useEffect)

Form state management

Component-specific state

# 🔌 API Integration

Service Layer

javascript

// services/api.js
```
import axios from 'axios';
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const fetchTrips = () => API.get('/trips');
export const createTrip = (tripData) => API.post('/trips', tripData);
export const bookSeats = (bookingData) => API.post('/bookings', bookingData);
```
Mock API Support
For development without a backend:

javascript
```
export const useMockAPI = process.env.REACT_APP_USE_MOCK_API === 'true';
```
# 🚢 Deployment

Build for Production
bash
```
npm run build
```
# Netlify Deployment
```
bash
netlify deploy --prod
Vercel Deployment
bash
vercel --prod
GitHub Pages
bash
npm run deploy
Docker Deployment
dockerfile
FROM node:16-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```
# 📱 Browser Support
Chrome (latest)

Firefox (latest)

Safari (latest)

Edge (latest)

# 🧪 Testing

bash
```
npm test
```
Component Tests
Using React Testing Library:

javascript
```
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
```
# 🔒 Security Considerations

Input validation on forms

Protected routes for authenticated users

Admin-only route protection

XSS protection

CORS configured with backend

# 📦 Dependencies

Main Dependencies
```
react ^18.2.0

react-dom ^18.2.0

react-router-dom ^6.8.0

axios ^1.3.0

tailwindcss ^3.2.0

react-icons ^4.7.0

Development Dependencies
@testing-library/react ^13.4.0

@testing-library/user-event ^14.4.0

eslint ^8.32.0

prettier ^2.8.0
```
# 🤝 Contributing

Fork the repository

Create a feature branch

bash
```
git checkout -b feature/amazing-feature
```
Commit your changes

bash
```
git commit -m 'Add some amazing feature'
```
Push to the branch

bash

git push origin feature/amazing-feature

Open a Pull Request

Code Style

Use Prettier for code formatting

Follow ESLint rules

Write meaningful commit messages

Add comments for complex logic

# 📄 License

This project is licensed under the MIT License.

# 🆘 Support

Documentation: Read the docs

Issues: GitHub Issues

Email: support@modextix.com

# 🙏 Acknowledgments

React team for the amazing framework

Tailwind CSS for the utility-first CSS

All contributors and testers

Built with ❤️ by the ModexTix Team