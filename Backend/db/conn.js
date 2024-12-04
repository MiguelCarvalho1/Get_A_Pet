const mongoose = require('mongoose');

async function main(){
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/getAPet');
    console.log('Successful connection ');
}

main().catch((err) => console.log(err));

module.exports = mongoose;