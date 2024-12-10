# Get a Pet

## Description

**Get a Pet** is a pet adoption platform. The project is split into two parts: the backend, developed with Node.js and Express using the MVC architecture pattern and MongoDB as the database, and the frontend, built with React.

## Features

- **User Registration and Authentication**: Allows users to register, log in, and manage their account.
- **Pet Registration**: Admins can register pets for adoption, including details like name, age, type, etc.
- **Pet Listing**: Users can view available pets for adoption and filter by type, age, and other criteria.
- **Pet Details**: Users can view detailed information about pets.
- **Interaction with Admins**: Users can send messages to admins regarding available pets.

## Technologies

- **Backend**: Node.js, Express, MongoDB
- **Frontend**: React
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: CSS, Styled-components

## Project Structure

```plaintext
.
├── backend/                 # Backend in Node.js
│   ├── controllers/         # Controllers
│   ├── models/              # Models
│   ├── routes/              # Routes
│   ├── config/              # Configuration (e.g., MongoDB connection)
│   └── server.js            # Main file to start the server
└── frontend/                # Frontend in React
    ├── components/          # Reusable components
    ├── pages/               # Application pages
    ├── services/            # Services to interact with the backend
    └── App.js               # Main application file


This README includes the main details about your project, such as the description, features, technologies used, and instructions for running the project both for the backend and frontend.
