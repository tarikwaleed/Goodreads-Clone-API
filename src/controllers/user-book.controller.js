const Book = require("../models/book.model");

exports.user_books_list = async function (req, res, next) {
  try {
    var results = {};
    results["data"] = [];
    const userid = req.query.userId;

    await Book.find({
      read: { $in: [userid] },
    })
      .populate("author")
      .populate("genre")
      .populate("ratings")
      .exec()
      .then((data) => {
        data.map((element) => {
          authorList = [];
          genreList = [];
          UserRating = "";
          allRatings = 0;
          for (author of element.author) {
            authorList.push({
              authorId: author._id,
              authorName: author.name,
            });
          }
          for (genre of element.genre) {
            genreList.push({
              genreName: genre.name,
            });
          }
          for (rating of element.ratings) {
            if (rating.user == userid) {
              UserRating = rating.rating;
              break;
            }
            // allRatings += rating.rating;
          }
          results.data.push({
            id: element._id,
            title: element.title,
            coverImage: element.coverImage,
            author: authorList,
            genre: genreList,
            shelf: "r",
            rating: UserRating,
            averageRating: element.averageRating,
            numOfRatings: element.ratings.length,
            // averageRating: allRatings / element.ratings.length,
          });
        });
      });

    await Book.find({
      wantToRead: { $in: [userid] },
    })
      .populate("author")
      .populate("genre")
      .populate("ratings")
      .exec()
      .then((data) => {
        data.map((element) => {
          authorList = [];
          genreList = [];
          UserRating = "";
          allRatings = 0;
          for (author of element.author) {
            authorList.push({
              authorId: author._id,
              authorName: author.name,
            });
          }
          for (genre of element.genre) {
            genreList.push({
              genreName: genre.name,
            });
          }
          for (rating of element.ratings) {
            if (rating.user == userid) {
              UserRating = rating.rating;
              break;
            }
            // allRatings += rating.rating;
          }
          results.data.push({
            id: element._id,
            title: element.title,
            coverImage: element.coverImage,
            author: authorList,
            genre: genreList,
            shelf: "w",
            rating: UserRating,
            averageRating: element.averageRating,
            numOfRatings: element.ratings.length,
            // averageRating: allRatings / element.ratings.length,
          });
        });
      });

    await Book.find({
      currentlyReading: { $in: [userid] },
    })
      .populate("author")
      .populate("genre")
      .populate("ratings")
      .exec()
      .then((data) => {
        data.map((element) => {
          authorList = [];
          genreList = [];
          UserRating = "";
          allRatings = 0;
          for (author of element.author) {
            authorList.push({
              authorId: author._id,
              authorName: author.name,
            });
          }
          for (genre of element.genre) {
            genreList.push({
              genreName: genre.name,
            });
          }
          for (rating of element.ratings) {
            if (rating.user == userid) {
              UserRating = rating.rating;
              break;
            }
            // allRatings += rating.rating;
          }
          results.data.push({
            id: element._id,
            title: element.title,
            coverImage: element.coverImage,
            author: authorList,
            genre: genreList,
            shelf: "c",
            rating: UserRating,
            averageRating: element.averageRating,
            numOfRatings: element.ratings.length,
            // averageRating: allRatings / element.ratings.length,
          });
        });
      });
    results.length = results.data.length;
    res.json(results);
  } catch (err) {
    return next(err);
  }
};

exports.user_book_details = async function (req, res, next) {
  try {
    var results = {};
    results["data"] = [];
    const userid = req.query.userId;
    const bookid = req.query.bookId;
    console.log(userid);
    console.log(bookid);

    // const id=req.params.user_id

    await Book.find({
      _id: bookid,
      read: { $in: [userid] },
    })
      .populate("author")
      .populate("genre")
      .populate("ratings")
      .exec()
      .then((data) => {
        data.map((element) => {
          authorList = [];
          genreList = [];
          UserRating = "";
          allRatings = 0;
          for (author of element.author) {
            authorList.push({
              authorId: author._id,
              authorName: author.name,
            });
          }
          for (genre of element.genre) {
            genreList.push({
              genreName: genre.name,
            });
          }
          for (rating of element.ratings) {
            if (rating.user == userid) {
              UserRating = rating.rating;
              break;
            }
            allRatings += rating.rating;
          }
          results.data.push({
            id: element._id,
            title: element.title,
            coverImage: element.coverImage,
            author: authorList,
            genre: genreList,
            shelf: "r",
            rating: UserRating,
            averageRating: element.averageRating,
            numOfRatings: element.ratings.length,
            averageRating: allRatings / element.ratings.length,
          });
        });
      });

    await Book.find({
      _id: bookid,
      wantToRead: { $in: [userid] },
    })
      .populate("author")
      .populate("genre")
      .populate("ratings")
      .exec()
      .then((data) => {
        data.map((element) => {
          authorList = [];
          genreList = [];
          UserRating = "";
          allRatings = 0;
          for (author of element.author) {
            authorList.push({
              authorId: author._id,
              authorName: author.name,
            });
          }
          for (genre of element.genre) {
            genreList.push({
              genreName: genre.name,
            });
          }
          for (rating of element.ratings) {
            if (rating.user == userid) {
              UserRating = rating.rating;
              break;
            }
            allRatings += rating.rating;
          }
          results.data.push({
            id: element._id,
            title: element.title,
            coverImage: element.coverImage,
            author: authorList,
            genre: genreList,
            shelf: "w",
            rating: UserRating,
            averageRating: element.averageRating,
            numOfRatings: element.ratings.length,
            averageRating: allRatings / element.ratings.length,
          });
        });
      });

    await Book.find({
      _id: bookid,
      currentlyReading: { $in: [userid] },
    })
      .populate("author")
      .populate("genre")
      .populate("ratings")
      .exec()
      .then((data) => {
        data.map((element) => {
          authorList = [];
          genreList = [];
          UserRating = "";
          allRatings = 0;
          for (author of element.author) {
            authorList.push({
              authorId: author._id,
              authorName: author.name,
            });
          }
          for (genre of element.genre) {
            genreList.push({
              genreName: genre.name,
            });
          }
          for (rating of element.ratings) {
            if (rating.user == userid) {
              UserRating = rating.rating;
              break;
            }
            allRatings += rating.rating;
          }
          results.data.push({
            id: element._id,
            title: element.title,
            coverImage: element.coverImage,
            author: authorList,
            genre: genreList,
            shelf: "c",
            rating: UserRating,
            averageRating: element.averageRating,
            numOfRatings: element.ratings.length,
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
  // const userId = req.originalUrl.split("/")[3] || req.body.userID;
  const userId = req.body.userId;
  const bookId = req.body.bookId;
  const bookStatus = req.body.bookStatus;
  console.log(userId, bookId, bookStatus);
  try {
    if (bookStatus == "r") {
      Book.updateOne(
        { _id: bookId },
        {
          $pull: { currentlyReading: userId, wantToRead: userId },
          $push: { read: userId },
        }
      ).then(() => {
        res.json("book updated");
      });
    } else if (bookStatus == "c") {
      Book.updateOne(
        { _id: bookId },
        {
          $pull: { read: userId, wantToRead: userId },
          $push: { currentlyReading: userId },
        }
      ).then(() => {
        res.json("book updated");
      });
    } else if (bookStatus == "w") {
      Book.updateOne(
        { _id: bookId },
        {
          $pull: { currentlyReading: userId, read: userId },
          $push: { wantToRead: userId },
        }
      ).then(() => {
        res.json("book updated");
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
