const express= require('express');
const auth = require("./v1/authRoutes");
const question = require("./v1/questionRoutes");
const session = require('./v1/sessionRoutes');
const ai = require('./v1/aiRoutes');
const router=express.Router();

router.use('/v1/auth',auth);
router.use('/v1/questions',question);
router.use('/v1/sessions',session);
router.use('/v1/ai',ai);

module.exports = router
