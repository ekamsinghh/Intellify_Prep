const User = require('../Models/User');

class UserRepository{
    constructor(){
        this.user = User;
    }

    async createUser(data){
        try{
            const exists=await this.user.findOne({email:data.email});// checking if user already exists
            if(exists){
                const err= "Mail already Registered!";
                throw err;
            }
            const user= await this.user.create(data);
            return user;
        }
        catch(err){
            console.log("Some error occured in repository");
            throw err;
        }
    }

    async findUser(data){
        try{
            const user=await this.user.findOne({email:data.email});
            return user;
        }
        catch(err){
            console.log("Some error occured in repository");
            throw err;
        }
    }
}

module.exports = UserRepository;