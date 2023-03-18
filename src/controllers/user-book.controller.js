
const User = require("../models/user.model");
const Book = require("../models/book.model");

// Display list of all Users.
exports.user_books_list = async function (req, res, next) {
  try {
    var results = {};
    results["data"] = [];
    const id = req.originalUrl.split('/')[3]

    await Book.find({
      read: { $in: [id] },
    })
      .exec()
      .then((data) => {
        data.map((element) => {
          results.data.push(element);
        });
      });

    await Book.find({
      wantToRead: { $in: [id] },
    })
      .exec()
      .then((data) => {
        data.map((element) => {
          results.data.push(element);
        });
      });

    await Book.find({
      currentlyReading: { $in: [id] },
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

    //   // Successful, so render.
    //   // console.log(results.author);
    res.json(results);
    //   // res.render("author_detail", {
    //   //   title: "Author Detail",
    //   //   author: results.author,
    //   //   author_books: results.authors_books,
    //   // });
  } catch (err) {
    return next(err);
  }
};

// Display list of all Users.
exports.user_books_currentlyReading_list = function (req, res, next) {
  console.log(id);
  const id = req.originalUrl.split('/')[3]
  Book.find({ currentlyReading: { $in: [id] } })
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
  const id = req.originalUrl.split('/')[3]
  Book.find({ wantToRead: { $in: [id] } })
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
  const id = req.originalUrl.split('/')[3]
  Book.find({ read: { $in: [id] } })
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
exports.update_user_book = async function (req, res, next) {
  const id = req.originalUrl.split('/')[3]
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
          $pull: { currentlyReading: id, read: req.params.id },
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