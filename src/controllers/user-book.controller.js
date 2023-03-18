const User = require("../models/user.model");
const Book = require("../models/book.model");

// Display list of all Users.
exports.user_books_list = async function (req, res, next) {
  try {
    var results = {};
    results["data"] = [];
    const id = req.originalUrl.split("/")[3];
    // const id=req.params.user_id

    await Book.find({
      read: { $in: [id] },
    })
      .populate("author")
      .populate("ratings")
      .exec()
      .then((data) => {
        data.map((element) => {
          authorList = [];
          UserRating = "";
          allRatings = 0;
          for (author of element.author) {
            authorList.push({
              authorId: author._id,
              authorName: author.name,
            });
          }
          for (rating of element.ratings) {
            if (rating.user == id) {
              UserRating = rating.rating;
            }
            allRatings += rating.rating;
          }
          results.data.push({
            id: element._id,
            title: element.title,
            coverImage: element.coverImage,
            author: authorList,
            shelf: "read",
            rating: UserRating,
            averageRating: allRatings / element.ratings.length,
          });
        });
      });

    await Book.find({
      wantToRead: { $in: [id] },
    })
      .populate("author")
      .populate("ratings")
      .exec()
      .then((data) => {
        data.map((element) => {
          authorList = [];
          UserRating = "";
          allRatings = 0;
          for (author of element.author) {
            authorList.push({
              authorId: author._id,
              authorName: author.name,
            });
          }
          for (rating of element.ratings) {
            if (rating.user == id) {
              UserRating = rating.rating;
            }
            allRatings += rating.rating;
          }
          results.data.push({
            id: element._id,
            title: element.title,
            coverImage: element.coverImage,
            author: authorList,
            shelf: "wantToRead",
            rating: UserRating,
            averageRating: allRatings / element.ratings.length,
          });
        });
      });

    await Book.find({
      currentlyReading: { $in: [id] },
    })
      .populate("author")
      .populate("ratings")
      .exec()
      .then((data) => {
        data.map((element) => {
          authorList = [];
          UserRating = "";
          allRatings = 0;
          for (author of element.author) {
            authorList.push({
              authorId: author._id,
              authorName: author.name,
            });
          }
          for (rating of element.ratings) {
            if (rating.user == id) {
              UserRating = rating.rating;
            }
            allRatings += rating.rating;
          }
          results.data.push({
            id: element._id,
            title: element.title,
            coverImage: element.coverImage,
            author: authorList,
            shelf: "currentlyReading",
            rating: UserRating,
            averageRating: allRatings / element.ratings.length,
          });
        });
      });
    results.length = results.data.length;
    res.json(results);
  } catch (err) {
    return next(err);
  }
};

// Display list of all Users.
exports.user_books_currentlyReading_list = function (req, res, next) {
  var results = {};
  results["data"] = [];
  const id = req.originalUrl.split("/")[3];
  Book.find({
    currentlyReading: { $in: [id] },
  })
    .populate("author")
    .populate("ratings")
    .exec()
    .then((data) => {
      data.map((element) => {
        authorList = [];
        UserRating = "";
        allRatings = 0;
        for (author of element.author) {
          authorList.push({
            authorId: author._id,
            authorName: author.name,
          });
        }
        for (rating of element.ratings) {
          if (rating.user == id) {
            UserRating = rating.rating;
          }
          allRatings += rating.rating;
        }
        results.data.push({
          id: element._id,
          title: element.title,
          coverImage: element.coverImage,
          author: authorList,
          shelf: "currentlyReading",
          rating: UserRating,
          averageRating: allRatings / element.ratings.length,
        });
      });
      results.length = results.data.length;
      res.json(results);
    })
    .catch((err) => {
      return next(err);
    });
};

// Display list of all Users.
exports.user_books_wantToRead_list = function (req, res, next) {
  var results = {};
  results["data"] = [];
  const id = req.originalUrl.split("/")[3];

  Book.find({
    wantToRead: { $in: [id] },
  })
    .populate("author")
    .populate("ratings")
    .exec()
    .then((data) => {
      data.map((element) => {
        authorList = [];
        UserRating = "";
        allRatings = 0;
        for (author of element.author) {
          authorList.push({
            authorId: author._id,
            authorName: author.name,
          });
        }
        for (rating of element.ratings) {
          if (rating.user == id) {
            UserRating = rating.rating;
          }
          allRatings += rating.rating;
        }
        results.data.push({
          id: element._id,
          title: element.title,
          coverImage: element.coverImage,
          author: authorList,
          shelf: "wantToRead",
          rating: UserRating,
          averageRating: allRatings / element.ratings.length,
        });
      });
      results.length = results.data.length;
      res.json(results);
    })
    .catch((err) => {
      return next(err);
    });
};

// Display list of all Users.
exports.user_books_read_list = function (req, res, next) {
  var results = {};
  results["data"] = [];
  const id = req.originalUrl.split("/")[3];

  Book.find({
    read: { $in: [id] },
  })
    .populate("author")
    .populate("ratings")
    .exec()
    .then((data) => {
      data.map((element) => {
        authorList = [];
        UserRating = "";
        allRatings = 0;
        for (author of element.author) {
          authorList.push({
            authorId: author._id,
            authorName: author.name,
          });
        }
        for (rating of element.ratings) {
          if (rating.user == id) {
            UserRating = rating.rating;
          }
          allRatings += rating.rating;
        }
        results.data.push({
          id: element._id,
          title: element.title,
          coverImage: element.coverImage,
          author: authorList,
          shelf: "read",
          rating: UserRating,
          averageRating: allRatings / element.ratings.length,
        });
      });
      results.length = results.data.length;
      res.json(results);
    })
    .catch((err) => {
      return next(err);
    });
};
exports.update_user_book = async function (req, res, next) {
  const id = req.originalUrl.split("/")[3] || req.body.userID;
  try {
    if (req.body.bookStatus == "read") {
      Book.updateOne(
        { _id: req.body.bookID },
        {
          $pull: { currentlyReading: id, wantToRead: id },
          $push: { read: id },
        }
      ).then(() => {
        res.sendStatus(200);
      });
    }
    if (req.body.bookStatus == "currentlyReading") {
      Book.updateOne(
        { _id: req.body.bookID },
        {
          $pull: { read: id, wantToRead: id },
          $push: { currentlyReading: id },
        }
      ).then(() => {
        res.sendStatus(200);
      });
    }
    if (req.body.bookStatus == "wantToRead") {
      Book.updateOne(
        { _id: req.body.bookID },
        {
          $pull: { currentlyReading: id, read: id },
          $push: { wantToRead: id },
        }
      ).then(() => {
        res.sendStatus(200);
      });
    }
  } catch (err) {
    return next(err);
  }
};

exports.delete_user_book = async function (req, res, next) {
  const id = req.originalUrl.split("/")[3];
  try {
    Book.updateOne(
      { _id: req.body.bookID },
      {
        $pull: { currentlyReading: id, wantToRead: id, read: id },
      }
    ).then(() => {
      res.sendStatus(200);
    });
  } catch (err) {
    return next(err);
  }
};
