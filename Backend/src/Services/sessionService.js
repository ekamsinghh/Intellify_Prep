const SessionRepository = require('../repository/sessionRepository');
const Question = require('../Models/Question');
class SessionService{
    constructor(){
        this.sessionRepository = new SessionRepository();
        this.Question = Question;
    }

    async createSession(data){
        try{

            const session = await this.sessionRepository.create({
                user: data.user,
                role: data.role,
                description: data.description,
                topics: data.topics,
                experience: data.experience
            });

            //* "await Promise.all" will wait for all the promises to resolve before moving on to the next line of code
            const questionDocs = await Promise.all(
                data.questions.map(async (q) => {
                    const question= await this.Question.create({
                        session: session.id,
                        question: q.question,
                        answer: q.answer
                    });
                    return question.id;
                })
            );

            session.questions = questionDocs;
            await session.save();
            return session;
        }
        catch(err){
            throw err;
        }
    }

    async getSessionById(id){
        try{
            const session = await this.sessionRepository.getSessionById(id);
            return session;
        }
        catch(err){
            throw err;
        }
    }

    async deleteSession(sessionId,userId){
        try{
            const session_user=await this.sessionRepository.getSessionById(sessionId);
            if(!session_user){
                throw "Session Not Found";
            }
            if(userId!=session_user.user){
                throw ("User is Not associated with this Session");
            }
            // session_user.questions.map(async (question) => {
            //     await this.Question.findByIdAndDelete(question.id);
            // })
            await this.Question.deleteMany({session:sessionId});
            const response = await this.sessionRepository.deleteSession(sessionId);
            if(response){
                return true;
            }
            return false;
        }
        catch(err){
            throw err;
        }
    }

    async getMySessions(id){
        try{
            const sessions = await this.sessionRepository.getMySessions(id);
            return sessions;
        }
        catch(err){
            throw err;
        }
    }
}

module.exports = SessionService;