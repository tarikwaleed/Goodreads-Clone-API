const Review = require("../models/review.model");
const Book = require("../models/book.model");
const { body, validationResult } = require("express-validator");

// Display list of all review.
exports.review_list = async function (req, res, next) {
  const bookId = req.query.bookId
  const filter = { book: bookId }
  let results = {}


  try {
    Review.find(filter).populate('user')
      .exec()
      .then((reviews) => {
        results['length'] = reviews.length
        results['data'] = reviews
        res.send(results);
      })
      .catch((err) => {
        return next(err);
      });
  } catch (err) {
    return next(err);
  }
};

// Display detail page for a specific review.
exports.review_detail = async (req, res, next) => {
  console.log("asdasdasdad");
  try {
    var results = {};
    results["review"] = await Review.findById(req.params.id).exec();
    results["review_user"] = await Book.find({ review: req.params.id }).exec();

    if (results.review == null) {
      // No results.
      const err = new Error("review not found");
      err.status = 404;
      return next(err);
    }

    res.send(results.review);
    // Successful, so render
    // res.render("review_detail", {
    //   title: "review Detail",
    //   review: results.review,
    //   review_books: results.review_books,
    // });
  } catch (err) {
    return next(err);
  }
};

exports.review_create_post = (req, res, next) => {
  // Create a review object with escaped and trimmed data.
  const review = new Review({
    book: req.body.bookId,
    user: req.body.userId,
    review: req.body.review,
  });

  // Data from form is valid.
  // Check if review with same name already exists.
  Review.findOne({ book: req.body.bookId, user: req.body.userId })
    .exec()
    .then((found_review) => {
      if (found_review) {
        req.body._id = found_review._id;
        return exports.review_update(req, res, next);
      } else {
        review
          .save()
          .then(() => {
            res.json(review);
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

// Handle review delete on POST.
exports.review_delete = async (req, res, next) => {
  console.log("asdasdas");
  var reviewId = req.body.reviewId || req.query.reviewId;
  try {
    Review.deleteOne({ _id: reviewId })
      .then((results) => {
        // if (results.review == null) {
        //   // No results.
        //   const err = new Error("review not found");
        //   err.status = 404;
        //   return next(err);
        // }

        // Success - go to author list
        // res.sendStatus(200);
        // res.send("removed");
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

// Handle review update on POST.
exports.review_update = async (req, res, next) => {
  //console.log(req.body);
  try {
    // update Author data
    Review.findOneAndUpdate(
      req.body._id,
      {
        book: req.body.book,
        user: req.body.user,
        review: req.body.review,
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
          const err = new Error("review not found");
          err.status = 404;
          return next(err);
        }
        // Success - go to author list
        // res.sendStatus(200);
        // res.send("removed");
        console.log("updated");
        res.json(results);
      })
      .catch((err) => {
        return next(err);
      });
  } catch (err) {
    return next(err);
  }
};

////////////////////not implemented//////////////////////////
// Display review create form on GET.
exports.review_create_get = (req, res, next) => {
  res.render("review_form", { title: "Create review" });
};

// Display review delete form on GET.
exports.review_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: review delete GET");
};

// Display review update form on GET.
exports.review_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: review update GET");
};
