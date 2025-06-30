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
    questions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question'
        }
    ]
}, {timestamps: true});

const Session= mongoose.model('Session',sessionShema);
module.exports=Session;