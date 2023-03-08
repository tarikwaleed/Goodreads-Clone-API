const rating = require("../models/rating.model");
const Book = require("../models/book.model");
const { body, validationResult } = require("express-validator");

// Display list of all rating.
exports.rating_list = async function (req, res, next) {
  try {
    var results = {};
    // results["rating"] = await rating.findById(req.params.id).exec();
    // results["rating_books"] = await Book.find({ rating: req.params.id }).exec();
    results["rating"] = await rating.countDocuments({ book: req.body.book });
    if (results.rating == null) {
      // No results.
      const err = new Error("rating not found");
      err.status = 404;
      return next(err);
    }

    res.json(results.rating);
    // Successful, so render
    // res.render("rating_detail", {
    //   title: "rating Detail",
    //   rating: results.rating,
    //   rating_books: results.rating_books,
    // });
  } catch (err) {
    return next(err);
  }
};

// Display detail page for a specific rating.
exports.rating_detail = async (req, res, next) => {
  try {
    var results = {};
    results["rating_book"] = await rating.findById(req.params.id).exec();
    results["rating_user"] = await Book.find({ rating: req.params.id }).exec();

    if (results.rating == null) {
      // No results.
      const err = new Error("rating not found");
      err.status = 404;
      return next(err);
    }

    res.send(results.rating);
    // Successful, so render
    // res.render("rating_detail", {
    //   title: "rating Detail",
    //   rating: results.rating,
    //   rating_books: results.rating_books,
    // });
  } catch (err) {
    return next(err);
  }
};

// Handle rating create on POST.
exports.rating_create_post = (req, res, next) => {
  // Create a rating object with escaped and trimmed data.
  const rating = new rating({ name: req.body.name });

  // Data from form is valid.
  // Check if rating with same name already exists.
  rating
    .findOne({ name: req.body.name })
    .exec()
    .then((found_rating) => {
      if (found_rating) {
        // rating exists, redirect to its detail page.
        res.redirect(found_rating.url);
      } else {
        rating
          .save()
          .then(() => {
            res.redirect(rating.url);
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

// Handle rating delete on POST.
exports.rating_delete = async (req, res, next) => {
  try {
    var results = {};
    results["rating"] = await rating.findById(req.params.id).exec();
    results["rating_books"] = await Book.find({ rating: req.params.id }).exec();

    if (results.rating == null) {
      // No results.
      const err = new Error("rating not found");
      err.status = 404;
      return next(err);
    }

    // Success
    if (results.rating_books.length > 0) {
      // rating has books. Render in same way as for GET route.
      const err = new Error("There are book that holds that rating");
      err.status = 404;
      return next(err);
    }

    rating
      .findByIdAndRemove(req.params.id)
      .then((data) => {
        // Success - go to author list
        // res.sendStatus(200);
        // res.send("removed");
        console.log("removed");
        res.redirect(`/rating/ratings`);
      })
      .catch((err) => {
        return next(err);
      });
  } catch (err) {
    return next(err);
  }
};

// Handle rating update on POST.
exports.rating_update = async (req, res, next) => {
  try {
    var results = await rating.findById(req.params.id).exec();

    if (results == null) {
      // No results.
      const err = new Error("rating not found");
      err.status = 404;
      return next(err);
    }

    // update Author data
    rating
      .findByIdAndUpdate(req.params.id, {
        name: req.body.name,
      })
      .then(() => {
        // Success - go to author list
        // res.sendStatus(200);
        // res.send("removed");
        console.log("updated");
        res.redirect(`/rating/${req.params.id}`);
      })
      .catch((err) => {
        return next(err);
      });
  } catch (err) {
    return next(err);
  }
};

////////////////////not implemented//////////////////////////
// Display rating create form on GET.
exports.rating_create_get = (req, res, next) => {
  res.render("rating_form", { title: "Create rating" });
};

// Display rating delete form on GET.
exports.rating_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: rating delete GET");
};

// Display rating update form on GET.
exports.rating_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: rating update GET");
};
