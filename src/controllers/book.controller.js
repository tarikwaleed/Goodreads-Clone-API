const Book = require("../models/book.model");

exports.book_create = (req, res, next) => {
  // Validate and sanitize fields.
  req.file.path = req.file.path.replace("\\", "/");
  console.log(req.file.path);
  const book = new Book({
    title: req.body.title,
    summary: req.body.summary,
    isbn: req.body.isbn,
    author: req.body.author,
    genre: req.body.genre,
    coverImage: req.file.path,
  });

  book.save((err) => {
    if (err) {
      return next(err);
    }
    res.json(book);
  });
};
exports.book_update = function (req, res) {
  console.log(req.body);
  if (req.file) {
    req.body.coverImage = req.file.path;
  }
  console.log(req.body);
  Book.findByIdAndUpdate(
    req.body._id,
    { $set: req.body },
    { new: true },
    function (err, book) {
      if (err) return next(err);
      res.send(book);
    }
  );
};
exports.book_delete = async (req, res, next) => {
  //? Callbacks Implementation
  // Book.findByIdAndRemove(req.body.id, (err) => {
  //     if (err) {
  //         return next(err);
  //     }
  //     res.json("book deleted")
  // });
  //? async/await Implementation
  const id = req.params.id;
  const filter = { _id: id };
  try {
    const deletedBook = await Book.findByIdAndDelete(filter);
    res.json(deletedBook);
  } catch (error) {
    next(`Outch! Couldn't delete the id ${id}`);
  }
};

exports.book_details = (req, res, next) => {
  Book.findById(req.params.id)
    .populate("author")
    .populate("genre")
    // .populate('reviews')
    // .populate('ratings')
    .populate("ratingCount")
    .populate({
      path: "ratings",
      select: "rating",
    })
    .exec()
    .then((book) => {
      const bookObject = book.toObject();
      bookObject.ratingCount = book.ratingCount;
      res.send(bookObject);
    });
};

exports.popular_book_list = (req, res, next) => {
  Book.find()
    .populate("author")
    .populate("genre")
    .populate("reviews")
    .populate("ratings")
    .populate("read")
    .populate("currentlyReading")
    .populate("wantToRead")
    .exec((err, book_list) => {
      if (err) {
        return next(err);
      }

      book_list.sort((a, b) => (a.averageRating > b.averageRating ? -1 : 1));
      book_list = book_list.map((book) => {
        return { ...book, avgRating: "book.averageRating" };
      });
      //   for (book of book_list) {
      //     book._id = "13216543213546";
      //     console.log(book._id);
      //     book["avgRating"] = book.averageRating;
      //   }
      res.json(book_list);
    });
};
exports.book_list = (req, res, next) => {
  Book.find()
    .populate("author")
    .populate("genre")
    .populate("reviews")
    .populate("ratings")
    .populate("read")
    .populate("currentlyReading")
    .populate("wantToRead")
    .exec((err, book_list) => {
      if (err) {
        return next(err);
      }
      booklistupdated = [];
      for (const book of book_list) {
        booklistupdated.push({
          _id: book._id,
          title: book.title,
          summary: book.summary,
          isbn: book.isbn,
          author: book.author,
          genre: book.genre,
          coverImage: book.coverImage,
          reviews: book.reviews,
          ratings: book.ratings,
          currentlyReading: book.currentlyReading,
          wantToRead: book.wantToRead,
          read: book.read,
          avgRating: book.averageRating || 0,
        });
      }
      res.json(booklistupdated);
    });
};
