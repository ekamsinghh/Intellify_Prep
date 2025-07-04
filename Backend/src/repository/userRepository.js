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

    async findUserByEmail(mail){
        try{
            const user=await this.user.findOne({email:mail});
            return user;
        }
        catch(err){
            console.log("Some error occured in repository");
            throw err;
        }
    }

    async findUserById(userId){
        try{
            const user = await this.user.findById(userId).select("-password");// this excludes the password for security reasons
            return user;
        }
        catch(err){
            console.log("Some error occured in repository");
            throw err;
        }
    }
    
}

module.exports = UserRepository;