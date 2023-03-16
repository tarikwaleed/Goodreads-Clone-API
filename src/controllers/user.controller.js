const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const Book = require("../models/book.model");
const { body, validationResult } = require("express-validator");

// Display list of all Users.
exports.user_list = function (req, res, next) {
  User.find()
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

exports.update_user_books_list = async function (req, res, next) {
  try {
    if (req.body.bookStatus == "read") {
      Book.updateOne(
        { _id: req.body.bookID },
        {
          $pull: { currentlyReading: req.params.id, wantToRead: req.params.id },
          $push: { read: req.params.id },
        }
      ).then(() => {
        res.sendStatus(200);
      });
    }
    if (req.body.bookStatus == "currentlyReading") {
      Book.updateOne(
        { _id: req.body.bookID },
        {
          $pull: { read: req.params.id, wantToRead: req.params.id },
          $push: { currentlyReading: req.params.id },
        }
      ).then(() => {
        res.sendStatus(200);
      });
    }
    if (req.body.bookStatus == "wantToRead") {
      Book.updateOne(
        { _id: req.body.bookID },
        {
          $pull: { currentlyReading: req.params.id, read: req.params.id },
          $push: { wantToRead: req.params.id },
        }
      ).then(() => {
        res.sendStatus(200);
      });
    }
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

exports.user_detail = async (req, res, next) => {
  try {
    var results = {};
    results["user"] = await User.findById(req.params.id).exec();

    if (results.user == null) {
      const err = new Error("User not found");
      err.status = 404;
      return next(err);
    }
    res.json(results.user);
  } catch (err) {
    return next(err);
  }
};

exports.user_create_post = (req, res, next) => {
  const hashPass = bcrypt.hashSync(req.body.password, 10);
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashPass,
    role: req.body.role,
  });

  User.findOne({ book: req.body.book, user: req.body.user })
    .exec()
    .then((found_user) => {
      if (found_user) {
        res.send("email already exists");
      } else {
        user
          .save()
          .then((data) => {
            // res.json(data);
            // res.sendStatus(200);
            res.sendStatus(200);
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

exports.user_delete = async (req, res, next) => {
  try {
    var results = {};
    results["user"] = await User.findById(req.params.id).exec();

    if (results.user == null) {
      const err = new Error("User not found");
      err.status = 404;
      return next(err);
    }
    // User has no books. Delete object and redirect to the list of users.
    User.findByIdAndRemove(req.params.id)
      .then((data) => {
        // Success - go to user list
        console.log("removed");
        res.sendStatus(200);
        // res.send("removed");
        // res.redirect("/user/users");
      })
      .catch((err) => {
        return next(err);
      });
  } catch (err) {
    return next(err);
  }
};

// Handle User update on POST.
exports.user_update = async (req, res, next) => {
  try {
    var results = await User.findById(req.params.id).exec();

    if (results == null) {
      // No results.
      const err = new Error("User not found");
      err.status = 404;
      return next(err);
    }

    const hashPass = bcrypt.hashSync(req.body.password, 10);
    // update User data
    User.findByIdAndUpdate(req.params.id, {
      username: req.body.username,
      email: req.body.email,
      password: hashPass,
      role: req.body.role,
    })
      .then(() => {
        // Success - go to user list
        console.log("updated");
        res.sendStatus(200);
        // res.send("removed");
        // res.redirect(`/user/${req.params.id}`);
      })
      .catch((err) => {
        return next(err);
      });
  } catch (err) {
    return next(err);
  }
};

// Display User create form on GET.  //not implementing
exports.user_create_get = (req, res, next) => {
  res.render("user_form", { title: "Create User" });
};

// Display User delete form on GET. //not implementing
exports.user_delete_get = async (req, res, next) => {
  try {
    var results = {};
    results["user"] = await User.findById(req.params.id).exec();
    results["users_books"] = await Book.find({
      user: req.params.id,
    }).exec();

    if (results.user == null) {
      // No results.
      res.redirect("/catalog/users");
    }
    // Successful, so render.
    res.render("user_delete", {
      title: "Delete User",
      user: results.user,
      user_books: results.users_books,
    });
  } catch (err) {
    return next(err);
  }
};
// Display User update form on GET.  //not implementing
exports.user_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: User update GET");
};
