const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    session: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Session'
    },
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    isPinned: {
        type: Boolean,
        default: false
    }
},{ timestamps: true });

const Question= mongoose.model('Question',questionSchema);
module.exports=Question;