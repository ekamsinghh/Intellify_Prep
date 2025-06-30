const Session = require('../Models/Session');

class SessionRepository{
    constructor(){
        this.session = Session;
    }

    async create(data){
        try{
            const session = await this.session.create(data);
            return session;
        }
        catch(err){
            throw err;
        }
    }

    async getSessionById(id){
        try{
            const session = await this.session.findById(id).populate({
                path:"questions",
                options: {
                    sort:{
                        isPinned: -1,
                        createdAt: 1
                    }
                }
            });
            if(!session){
                throw "Session Not Found";
            }
            return session;
        }
        catch(err){
            throw(err);
        }
    }

    async deleteSession(id){
        try{
            const response = await this.session.findByIdAndDelete(id);
            return response;
        }
        catch(err){
            throw err;
        }
    }


    async getMySessions(userId){
        try{
            const response = await this.session.find({user:userId}).populate("questions").sort({createdAt:-1});
            // Sorting will be done based on the createdAt field but in descending order
            return response;
        }
        catch(err){
            throw err;
        }
    }
}

module.exports = SessionRepository;