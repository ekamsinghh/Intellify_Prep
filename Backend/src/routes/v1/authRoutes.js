const express= require('express');
const { registerUser, loginUser, getUserProfile }= require('../../controllers/authController');
const { protect } = require('../../middlewares/authMiddleware');
const upload = require('../../middlewares/uploadMiddleware');
const router=express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/profile',protect,getUserProfile);

router.post('/upload-image',upload.single('image'), (req, res) => {
    if(!req.file){
        return res.status(400).json({
            message:"No file Uploaded",
            success:false,
            data:{},
            error:"Bad Request"
        });
    }
    //creating image url
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    // req.protocol is http or https and req.get('host') is the host name of the server
    res.status(200).json({ 
        imageUrl 
    });

})// upload.single() is a multer middleware
module.exports = router;