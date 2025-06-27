const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/index');
const bcrypt = require('bcrypt');
const UserRepository = require('../repository/userRepository');

class UserService {
    constructor(){
        this.userRepository = new UserRepository();
    }

    #generateToken(userId){
        return jwt.sign({ id: userId }, JWT_SECRET , { expiresIn: "7d" });
    }


    #comparePassword(password,user){
        return bcrypt.compare(password,user.password);
    }

    //Creating/Registering a new User
    async createUser(data){
        try{
            const user= await this.userRepository.createUser(data);
            return {
                ...data,
                token: this.#generateToken(user.id)
            };
        }
        catch(err){
            console.log("Some error occured in service layer");
            throw err;
        }
    }

    async findUser(data){
        try{
            const user = await this.userRepository.findUser(data);
            if(!user){
                throw "User Not Found";
            }
            if(!(await this.#comparePassword(data.password,user))){
                throw "Incorrect Password";
            }
            return {
                token: this.#generateToken(user.id)
            };
        }
        catch(err){
            console.log("Some error occured in service layer");
            throw err;
        }
    }
}

module.exports = UserService;