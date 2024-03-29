const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const Book = require("../models/book.model");

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

