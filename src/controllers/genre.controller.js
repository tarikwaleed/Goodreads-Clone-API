const Genre = require("../models/genre.model");
const Book = require("../models/book.model");
const { body, validationResult } = require("express-validator");

// Display list of all Genre.
exports.genre_list = function (req, res, next) {
  Genre.find()
    .exec()
    .then((list_genre) => {
      res.send(list_genre);
      //   res.render("genre_list", {
      //     title: "Genre List",
      //     genre_list: list_genre,
      //   });
    })
    .catch((err) => {
      return next(err);
    });
};

// Display detail page for a specific Genre.
exports.genre_detail = async (req, res, next) => {
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

// Handle Genre create on POST.
exports.genre_create_post = (req, res, next) => {
  // Create a genre object with escaped and trimmed data.
  const genre = new Genre({ name: req.body.name });

  // Data from form is valid.
  // Check if Genre with same name already exists.
  Genre.findOne({ name: req.body.name })
    .exec()
    .then((found_genre) => {
      if (found_genre) {
        // Genre exists, redirect to its detail page.
        // res.redirect(found_genre.url);
        res.send("already created");
      } else {
        genre
          .save()
          .then(() => {
            res.sendStatus(200);
            // res.redirect(genre.url);
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

// Handle Genre delete on POST.
exports.genre_delete = async (req, res, next) => {
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

    // Success
    if (results.genre_books.length > 0) {
      // Genre has books. Render in same way as for GET route.
      const err = new Error("There are book that holds that genre");
      err.status = 404;
      return next(err);
    }

    Genre.findByIdAndRemove(req.params.id)
      .then((data) => {
        // Success - go to author list
        // res.sendStatus(200);
        // res.send("removed");
        console.log("removed");
        //res.redirect(`/genre/genres`);
        res.sendStatus(200);
      })
      .catch((err) => {
        return next(err);
      });
  } catch (err) {
    return next(err);
  }
};

// Handle Genre update on POST.
exports.genre_update = async (req, res, next) => {
  try {
    var results = await Genre.findById(req.params.id).exec();

    if (results == null) {
      // No results.
      const err = new Error("Genre not found");
      err.status = 404;
      return next(err);
    }

    // update Author data
    Genre.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
    })
      .then(() => {
        // Success - go to author list
        // res.sendStatus(200);
        // res.send("removed");
        console.log("updated");
        res.sendStatus(200);
      })
      .catch((err) => {
        return next(err);
      });
  } catch (err) {
    return next(err);
  }
};

////////////////////not implemented//////////////////////////
// Display Genre create form on GET.
exports.genre_create_get = (req, res, next) => {
  res.render("genre_form", { title: "Create Genre" });
};

// Display Genre delete form on GET.
exports.genre_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Genre delete GET");
};

// Display Genre update form on GET.
exports.genre_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Genre update GET");
};
