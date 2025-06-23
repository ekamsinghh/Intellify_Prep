const User = require('../Models/User');

class UserRepository{
    constructor(){
        this.user = User;
    }

    async createUser(data){
        try{
            const user= await this.user.create(data);
            return user;
        }
        catch(err){
            console.log("Some error occured in repository");
            throw err;
        }
    }
}

module.exports = UserRepository;