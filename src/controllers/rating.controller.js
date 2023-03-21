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

exports.rating_create = (req, res, next) => {
  const rating = new Rating({
    book: req.body.bookID,
    user: req.body.userID,
    rating: req.body.rating,
  });

  Rating.findOne({ book: req.body.bookID, user: req.body.userID })
    .exec()
    .then((found_rating) => {
      if (found_rating) {
        req.body._id = found_rating._id;
        return exports.rating_update(req, res, next);
      } else {
        rating
          .save()
          .then((results) => {
            Book.updateOne(
              { _id: req.body.bookID },
              {
                $push: { ratings: results._id },
              }
            ).then(() => {
              res.json(results);
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

exports.rating_delete = async (req, res, next) => {
  try {
    Rating.findOneAndRemove({
      book: req.body.book,
      user: req.body.user,
    })
      .then((results) => {
        if (results.rating == null) {
          const err = new Error("rating not found");
          err.status = 404;
          return next(err);
        }

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
