
const User = require("../models/user.model");
const Book = require("../models/book.model");

// Display list of all Users.
exports.user_books_list = async function (req, res, next) {
  try {
    var results = {};
    results["data"] = [];

    await Book.find({
      read: { $in: [req.params.id] },
    })
      .exec()
      .then((data) => {
        data.map((element) => {
          results.data.push(element);
        });
      });

    await Book.find({
      wantToRead: { $in: [req.params.id] },
    })
      .exec()
      .then((data) => {
        data.map((element) => {
          results.data.push(element);
        });
      });

    await Book.find({
      currentlyReading: { $in: [req.params.id] },
    })
      .exec()
      .then((data) => {
        data.map((element) => {
          results.data.push(element);
        });
      });

    if (results.data.length == 0) {
      const err = new Error("Books not found");
      err.status = 404;
      return next(err);
    }

    // Successful, so render.
    // console.log(results.author);
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

// Display list of all Users.
exports.user_books_currentlyReading_list = function (req, res, next) {
  console.log(req.params.id);
  Book.find({ currentlyReading: { $in: [req.params.id] } })
    .exec()
    .then((list_users) => {
      // console.log(list_users);
      res.json(list_users);
      //   res.render("user_list", {
      //     title: "User List",
      //     user_list: list_users,
      //   });
    })
    .catch((err) => {
      return next(err);
    });
};

// Display list of all Users.
exports.user_books_wantToRead_list = function (req, res, next) {
  Book.find({ wantToRead: { $in: [req.params.id] } })
    .exec()
    .then((list_users) => {
      // console.log(list_users);
      res.json(list_users);
      //   res.render("user_list", {
      //     title: "User List",
      //     user_list: list_users,
      //   });
    })
    .catch((err) => {
      return next(err);
    });
};

// Display list of all Users.
exports.user_books_read_list = function (req, res, next) {
  Book.find({ read: { $in: [req.params.id] } })
    .exec()
    .then((list_users) => {
      // console.log(list_users);
      res.json(list_users);
      //   res.render("user_list", {
      //     title: "User List",
      //     user_list: list_users,
      //   });
    })
    .catch((err) => {
      return next(err);
    });
};