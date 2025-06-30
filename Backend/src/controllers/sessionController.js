const SessionService = require("../Services/sessionService");
const sessionService = new SessionService();

const createSession = async (req,res) => {
    try{
        const data={
            ...req.body,
            user: req.user.id
        };
        const session = await sessionService.createSession(data);
        return res.status(200).json({
            message: 'Session created successfully',
            data: session,
            success: true,
            error: {}
        });
    }
    catch(err){
        return res.status(500).json({
            message: "Internal Server Error",
            data: {},
            success: false,
            error: err
        });
    }
}

const getSessionById = async (req,res) => {
    try{
        const session = await sessionService.getSessionById(req.params.id);
        return res.status(200).json({
            message: 'Session fetched successfully',
            data: session,
            success: true,
            error: {}
        });
    }
    catch(err){
        if(err=="Session Not Found"){
            return res.status(404).json({
                message: "Invalid Session Id",
                data: {},
                success: false,
                error: err
            });
        }
        return res.status(500).json({
            message: "Internal Server Error",
            data: {},
            success: false,
            error: err
        });
    }
}

const deleteSession = async (req,res) => {
    try{
        const success = await sessionService.deleteSession(req.params.id,req.user.id);
        return res.status(200).json({
            message: 'Session Deleted successfully',
            status: success,
            error: {}
        });
    }
    catch(err){
        if(err=="User is Not associated with this Session"){
            return res.status(401).json({
                message: "User is not authorized to delete this session",
                data: {},
                success: false,
                error: err
            });
        }
        if(err=="Session Not Found"){
            return res.status(404).json({
                message: "Invalid Session Id",
                data: {},
                success: false,
                error: err
            });
        }
        return res.status(500).json({
            message: "Internal Server Error",
            data: {},
            error: err
        });
    }
}

const getMySessions = async (req,res) => {
    try{
        const sessions = await sessionService.getMySessions(req.user.id);
        return res.status(200).json({
            message: 'Sessions fetched successfully',
            data: sessions,
            success: true,
            error: {}
        });
    }
    catch(err){
        return res.status(500).json({
            message: "Internal Server Error",
            data: {},
            success: false,
            error: err
        });
    }
}

module.exports = {
    createSession,
    getSessionById,
    deleteSession,
    getMySessions
}