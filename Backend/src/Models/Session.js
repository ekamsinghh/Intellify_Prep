const mongoose = require('mongoose');

const sessionShema= new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    role: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    topics: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    question: {
        type: mongoose.mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    } 
}, {timeStamps: true});

const Session= mongoose.model('Session',sessionShema);
module.exports=Session;