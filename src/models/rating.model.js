const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RatingSchema = new Schema({
  book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
});

module.exports = mongoose.model("Rating", RatingSchema);
