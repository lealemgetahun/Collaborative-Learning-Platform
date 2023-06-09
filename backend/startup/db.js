/* eslint-disable no-undef */
const mongoose = require("mongoose");
require("dotenv").config();
require("../index");
var connectionString = "";
if (process.env.NODE_ENV === "test") {
    connectionString = process.env.MD_TEST;
} else {
    connectionString = process.env.MD_DEV;
}
mongoose.connect(
    connectionString,
    {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => {
        if (err) {
            // eslint-disable-next-line no-console
            console.log("Error connecting to database. " + err);
        } else {
            // eslint-disable-next-line no-console
            console.log("Connected to Database! " + process.env.NODE_ENV + " via " + "mongo...");
        }
    }
);
