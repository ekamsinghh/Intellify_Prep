const express= require('express');
const { PORT } = require('./config/index');
const cors= require('cors');
const path= require('path');
const app = express();
const v1ApiRoutes = require('./routes/index');
const connect = require('./config/db_config');

//For body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// redirecting the routes
app.use('/api',v1ApiRoutes);

// app.use('/api/ai/generate-questions', protect , generateInterviewQuestions);
// app.use('/api/ai/generate-explanation', protect , generateConceptExplanation);

//Middlware setup for cross origin requests
app.use(cors({
    origin: "*",// Allows the requests from all the origins
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]// if we don't define or set these two are the default values
}));


//Serves the files from uploads folder(static files{which don't change over time})
app.use("/uploads",express.static(path.join(__dirname, "uploads"), {}));


app.listen(PORT,async () => {
    console.log('Server is running on port ',PORT);
    await connect();
});