const UserRepository = require('../repository/userRepository');

class UserService {
    constructor(){
        this.userRepository = new UserRepository();
    }

    async createUser(data){
        try{
            const user= await this.userRepository.createUser(data);
            return user;
        }
        catch(err){
            console.log("Some error occured in service layer");
            throw err;
        }
    }
}

module.exports = UserService;