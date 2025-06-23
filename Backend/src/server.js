const express= require('express');
const { PORT } = require('./config');
const cors= require('cors');
const path= require('path');
const app = express();
const v1ApiRoutes = require('./routes/index');

app.use('/api',v1ApiRoutes);

//Middlware setup for cross origin requests
app.use(cors({
    origin: "*",// Allows the requests from all the origins
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]// if we don't define or set these two are the default values
}));

//Serves the files from uploads folder
app.use("/uploads",express.static(path.join(__dirname, "uploads"), {}));

//For body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log('Server is running on port ',PORT);
});