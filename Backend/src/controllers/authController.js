const UserSerice= require('../Services/userService');
const userService= new UserSerice();

const registerUser= async (req,res) => {
    try{
        const user = await userService.createUser(req.body);
        return res.status(200).json({
            message: 'User created successfully',
            data: user,
            success: true,
            error: {}
        });
    }
    catch(err){
        if(err=="Mail already Registered!"){
            return res.status(400).json({
                data: {},
                success: false,
                error: err
            });
        }
        return res.status(500).json({
            message: "Something went wrong",
            data: {},
            success: false,
            error: err
        });
    }
}

const loginUser = async (req,res) => {
    try{
        const user = await userService.findUser(req.body);
        return res.status(200).json({
            message: 'User logged in successfully',
            data: user,
            success: true,
            error: {}
        });
    }
    catch(err){
        if(err==("User Not Found" || "Incorrect Password")){
            return res.status(400).json({
                data: {},
                success: false,
                error: err
            });
        }
        return res.status(500).json({
            message: "Something went wrong",
            data: {},
            success: false,
            error: err
        });
    }
}

module.exports= {
    registerUser,
    loginUser
}