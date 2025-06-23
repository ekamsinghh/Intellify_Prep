const mongoose = require('mongoose');
const { DB_URL } = require('./index');
const connect = async () => {
    try{
        await mongoose.connect(DB_URL);
        console.log("Connected to database.");
    }
    catch(err){
        console.log("Error connecting to database",err);
        process.exit(1);
    }
}

module.exports = connect