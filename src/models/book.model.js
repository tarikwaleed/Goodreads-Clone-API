const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  isbn: { type: String, required: true },
  author: [{ type: Schema.Types.ObjectId, ref: "Author", required: true }],
  genre: [{ type: Schema.Types.ObjectId, ref: "Genre" }],
  coverImage: { type: String, required: true },
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  ratings: [{ type: Schema.Types.ObjectId, ref: "Rating" }],
  currentlyReading: [{ type: Schema.Types.ObjectId, ref: "User" }],
  wantToRead: [{ type: Schema.Types.ObjectId, ref: "User" }],
  read: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

BookSchema.virtual("averageRating").get(function () {
  const ratings = this.ratings.map((r) => r.rating);
  if (ratings.length > 0) {
    const sum = ratings.reduce((a, b) => a + b);
    return sum / ratings.length;
    // return (sum / ratings.length).toFixed(1);
  }
  return 0;
});
BookSchema.virtual("ratingCount").get(function () {
  return this.ratings.length;
});

module.exports = mongoose.model("Book", BookSchema);
