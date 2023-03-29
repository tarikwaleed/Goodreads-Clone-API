const Author = require("../models/author.model");
const Book = require("../models/book.model");

exports.authors_list = async function (req, res, next) {
  var results = [];
  var authorAndBooks = {};
  await Author.find()
    .sort([["last_name", "ascending"]])
    .exec()
    .then(async (authors) => {
      for (author of authors) {
        authorAndBooks["author"] = author;
        authorAndBooks["authors_books"] = [];
        authorID = author._id;
        await Book.find({ author: authorID })
          .populate("author")
          .populate("ratings")
          .exec()
          .then((books) => {
            for (book of books) {
              authorAndBooks["authors_books"].push({
                _id: book._id,
                title: book.title,
                summary: book.summary,
                isbn: book.isbn,
                coverImage: book.coverImage,
                avgrating: book.averageRating || 0,
              });
            }

            // res.json(authorAndBooks);
          });
        results.push({
          author: authorAndBooks["author"],
          authors_books: authorAndBooks["authors_books"],
        });
      }
    });
  res.json(results);
};

exports.author_details = async (req, res, next) => {
  try {
    var results = {};
    results["author"] = await Author.findById(req.params.id).exec();
    results["authors_books"] = [];
    await Book.find(
      { author: req.params.id }
      // "title summary"
    )
      .populate("ratings")
      .exec()
      .then((books) => {
        for (book of books) {
          results["authors_books"].push({
            _id: book._id,
            title: book.title,
            summary: book.summary,
            isbn: book.isbn,
            coverImage: book.coverImage,
            avgrating: book.averageRating || 0,
          });
        }

        // results["authors_books"]
      });

    if (results.author == null) {
      const err = new Error("Author not found");
      err.status = 404;
      return next(err);
    }

    // Successful, so render.
    res.json(results);
    // res.render("author_detail", {
    //   title: "Author Detail",
    //   author: results.author,
    //   author_books: results.authors_books,
    // });
  } catch (err) {
    return next(err);
  }
};

exports.author_create = (req, res, next) => {
  req.file.path = req.file.path.replace("\\", "/");
  const first_name = req.body.authorName.split(" ")[0];
  const last_name = req.body.authorName.split(" ")[1];
  const author = new Author({
    first_name: first_name,
    last_name: last_name,
    date_of_birth: req.body.dateOfBirth,
    photo: req.file.path,
  });
  author
    .save()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      return next(err);
    });
};
exports.author_update = async (req, res, next) => {
  if (req.file) {
    req.body.photo = req.file.path.replace("\\", "/");
  }

  Author.findByIdAndUpdate(
    req.body._id,
    { $set: req.body },
    { new: true },
    function (err, author) {
      if (err) return next(err);
      res.status(200).json(author);
    }
  );
};

exports.author_delete = async (req, res, next) => {
  try {
    var results = {};
    results["authors_books"] = await Book.find({
      author: req.params.id,
    }).exec();

    if (results.authors_books.length > 0) {
      const err = new Error("There are book that holds author name");
      err.status = 409;
      return next(err);
    }
    Author.findByIdAndRemove(req.params.id)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        return next(err);
      });
  } catch (err) {
    return next(err);
  }
};
