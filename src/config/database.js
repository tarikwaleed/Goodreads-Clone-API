require("dotenv").config()
const mongoose = require("mongoose")
mongoose.set("strictQuery", false)

const { LOCAL_DB_URI } = process.env
const { REMOTE_DB_URI } = process.env

exports.connect = () => {
    // Connecting to the database
    mongoose
        .connect(REMOTE_DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log("Successfully connected to database")
        })
        .catch((error) => {
            console.log("database connection failed. exiting now...")
            console.error(error)
            process.exit(1)
        })
}