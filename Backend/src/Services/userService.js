const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserRepository = require('../repository/userRepository');

class UserService {
    constructor(){
        this.userRepository = new UserRepository();
    }

    #generateToken(id){
        return jwt.sign({ id: id }, JWT_SECRET , { expiresIn: "7d" });
    }

    //Creating/Registering a new User
    async createUser(data){
        try{
            const user= await this.userRepository.createUser(data);
            return user;
        }
        catch(err){
            if(err)
            console.log("Some error occured in service layer");
            throw err;
        }
    }
}

module.exports = UserService;