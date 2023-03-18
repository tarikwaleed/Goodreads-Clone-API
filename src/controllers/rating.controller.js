const Rating = require("../models/rating.model");
const Book = require("../models/book.model");
const { body, validationResult } = require("express-validator");

// Display list of all rating.
exports.rating_list = async function (req, res, next) {
  try {
    var results = {};
    // results["rating"] = await rating.findById(req.params.id).exec();
    // results["rating_books"] = await Book.find({ rating: req.params.id }).exec();
    results["rating"] = await Rating.countDocuments({ book: req.body.book });
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
    results["rating"] = await Rating.findById(req.params.id).exec();
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
  const rating = new Rating({
    book: req.body.book,
    user: req.body.user,
    rating: req.body.rating,
  });

  // Data from form is valid.
  // Check if rating with same name already exists.
  Rating.findOne({ book: req.body.book, user: req.body.user })
    .exec()
    .then((found_rating) => {
      if (found_rating) {
        // rating exists, redirect to its detail page.
        //res.redirect(303, `/${found_rating._id}`);
        req.body._id = found_rating._id;
        return exports.rating_update(req, res, next);
      } else {
        rating
          .save()
          .then((results) => {
            console.log(req.body.book);
            console.log("++++++++++++++++++++++++++++++++++");
            console.log(results);
            Book.updateOne(
              { _id: req.body.book },
              {
                $push: { ratings: results._id },
              }
            ).then(() => {
              res.sendStatus(200);
            });
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
    Rating.findOneAndRemove({
      book: req.body.book,
      user: req.body.user,
    })
      .then((results) => {
        if (results.rating == null) {
          // No results.
          const err = new Error("rating not found");
          err.status = 404;
          return next(err);
        }

        // Success - go to author list
        // res.sendStatus(200);
        // res.send("removed");
        Book.updateOne(
          { _id: req.body.book },
          {
            $pull: { ratings: results._id },
          }
        );
        console.log("removed");
        res.sendStatus(200);
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
  //console.log(req.body);
  try {
    // update Author data
    Rating.findOneAndUpdate(
      { book: req.body.book, user: req.body.user },
      {
        book: req.body.book,
        user: req.body.user,
        rating: req.body.rating,
      },
      {
        new: true,
      }
    )
      .exec()
      .then((results) => {
        console.log(results);
        if (results == null) {
          // No results.
          const err = new Error("rating not found");
          err.status = 404;
          return next(err);
        }
        Book.updateOne(
          { _id: req.body.book },
          {
            $push: { ratings: "12312313123" },
          }
        );
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
