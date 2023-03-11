require("dotenv").config();
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const { LOCAL_DB_URI } = process.env;
const { REMOTE_DB_URI } = process.env;

const url =
  "mongodb+srv://Database_Admins:yH6ocwxKojzGgWqn@goodreads-cluster.dqgigbj.mongodb.net/Goodreads-Database-0?retryWrites=true&w=majority";
exports.connect = () => {
  // Connecting to the database
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
};
