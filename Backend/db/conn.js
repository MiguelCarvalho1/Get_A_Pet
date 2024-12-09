const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/getAPet')
    .then(() => {
        console.log('Successfully connected to MongoDB');
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB:', error);
    });

module.exports = mongoose;
