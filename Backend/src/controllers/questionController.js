const Question = require('../Models/Question');
const Session = require('../Models/Session');

const addQuestionsToSession = async (req,res) => {
    try{
        const { sessionId , questions } = req.body;
        if(!sessionId || !questions || !questions.length){
            return res.status(400).json({
                message: "Invalid Request",
                data: {},
                success: false,
                err: "BAD_REQUEST"
            })
        };

        const question_ids =await Promise.all(
            questions.map(async(q) => {
                const question = await Question.create({
                    session: sessionId,
                    question: q.question,
                    answer: q.answer
                });
                return question.id;
            })
        );

        const session = await Session.findById(sessionId);
        session.questions.push(...question_ids);
        await session.save();

        return res.status(201).json({
            message: "Questions added to session successfully",
            data: session,
            success: true,
            err: {}
        });
    }
    catch(err){
        return res.status(500).json({
            message: "Internal Server Error",
            data: {},
            success: false,
            err: err
        });
    }
}

const togglePinQuestion = async (req,res) => {
    try{

        //* Better Approach(for Production)
        const {questionId} = req.params;
        const response = await Question.findOneAndUpdate(
            { id:questionId },
            [
                {
                    $set: {
                        isPinned: { $not: "$isPinned" }
                    }
                }
            ],// for toggling the boolean value
            { new: true} //returns the updated document
        );

        // const  questionId  = req.params.id;
        // const response=await Question.findById(questionId);
        
        if (!response) {
            return res.status(404).json({
                message: "Question not found",
                data: {},
                success: false,
                err: "NOT_FOUND"
            });
        }

        // response.isPinned = !response.isPinned;
        // await response.save();

        return res.status(200).json({
            message: "Question updated successfully",
            data: response,
            success: true,
            err: {}
        });
    }
    catch(err){
        console.log(err.message);
        return res.status(500).json({
            message: "Internal Server Error",
            data: {},
            success: false,
            err: err.message || "Toggle Pin Error"
        })
    }
}

const updateQuestionNote = async (req,res) => {
    try{
        const { note } = req.body;
        const questionId = req.params.id;
        const response=await Question.findById(questionId);
        if (!response) {
            return res.status(404).json({
                message: "Question not found",
                data: {},
                success: false,
                err: "NOT_FOUND"
            });
        }
        response.notes = note;
        await response.save();
        return res.status(200).json({
            message: "Question updated successfully",
            data: response,
            success: true,
            err: {}
        });
    }
    catch(err){
        console.log(err.message);
        return res.status(500).json({
            message: "Internal Server Error",
            data: {},
            success: false,
            err: err.message || "Error while adding note"
        })
    }
}

module.exports = {
    addQuestionsToSession,
    togglePinQuestion,
    updateQuestionNote
}