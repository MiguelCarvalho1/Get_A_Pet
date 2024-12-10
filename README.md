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



### Key Updates

- The instructions now include detailed steps for **setting up the backend and frontend**, configuring MongoDB, and running the project.
- **Environment variables**: A `.env` file is required for the backend, and the API URL is mentioned for the frontend to interact with the backend.
- Added notes on how to **test the project** and ensure the backend and frontend are working together. 

This should provide a more comprehensive guide for setting up and running your "Get a Pet" project.


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



