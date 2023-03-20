const Genre = require("../models/genre.model");
const Book = require("../models/book.model");
const { body, validationResult } = require("express-validator");

// Display list of all Genre.
exports.genre_list = function (req, res, next) {
  Genre.find()
    .exec()
    .then((list_genre) => {
      res.send(list_genre);
    })
    .catch((err) => {
      return next(err);
    });
};

// Display detail page for a specific Genre.
exports.genre_details = async (req, res, next) => {
  try {
    var results = {};
    results["genre"] = await Genre.findById(req.params.id).exec();
    results["genre_books"] = await Book.find({ genre: req.params.id }).exec();

    if (results.genre == null) {
      // No results.
      const err = new Error("Genre not found");
      err.status = 404;
      return next(err);
    }

    res.send(results.genre);
    // Successful, so render
    // res.render("genre_detail", {
    //   title: "Genre Detail",
    //   genre: results.genre,
    //   genre_books: results.genre_books,
    // });
  } catch (err) {
    return next(err);
  }
};

exports.genre_create_post = (req, res, next) => {
  const genre = new Genre({ name: req.body.name });

  Genre.findOne({ name: req.body.name })
    .exec()
    .then((found_genre) => {
      if (found_genre) {
        res.send("This Genre already exists");
      } else {
        genre
          .save()
          .then(() => {
            // res.sendStatus(200);
            res.status(200).json(genre)
          })
          .catch((err) => {
            return next(err);
          });
      }
    })
    .catch((err) => {
      return next(err);
    });
};

exports.genre_delete = async (req, res, next) => {
  try {
    var results = {};
    results["genre_books"] = await Book.find({ genre: req.params.id }).exec();
    if (results.genre_books.length > 0) {
      return res.status(409).json({ message: "Cannot delete genre as it has related books." });
    }

    Genre.findByIdAndRemove(req.params.id)
      .then((data) => {
        res.status(200).send(data)
      })
      .catch((err) => {
        return next(err);
      });
  } catch (err) {
    return next(err);
  }
};

exports.genre_update = async (req, res, next) => {
  try {
    var results = await Genre.findById(req.params.id).exec();
    if (results == null) {
      res.send("genre doesn't exist")

    }

    Genre.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
    })
      .then((data) => {
        console.log("updated");
        res.status(200).json(data)
      })
      .catch((err) => {
        return next(err);
      });
  } catch (err) {
    return next(err);
  }
};
