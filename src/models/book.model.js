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

BookSchema.virtual('averageRating').get(function () {
  if (this.ratings.length === 0) {
    return 0;
  } else {
    const sum = this.ratings.reduce((acc, rating) => acc + rating.rating, 0);
    return sum / this.ratings.length;
  }
});
BookSchema.virtual('ratingCount', {
  ref: 'Rating',
  localField: '_id',
  foreignField: 'book',
  count: true
});


module.exports = mongoose.model("Book", BookSchema);
