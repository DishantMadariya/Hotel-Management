const express = require("express");
const app = express();
const dotenv = require("dotenv");
const db = require('./config/connection');
const userrouter = require('./routs/user');
app.use(express.urlencoded());
dotenv.config();


app.use('/', userrouter);
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});