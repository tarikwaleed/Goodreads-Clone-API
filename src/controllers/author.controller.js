const Author = require("../models/author.model");
const Book = require("../models/book.model");

exports.authors_list = function (req, res, next) {
  Author.find()
    .sort([["last_name", "ascending"]])
    .exec()
    .then((list_authors) => {
      // console.log(list_authors);
      res.json(list_authors);
      //   res.render("author_list", {
      //     title: "Author List",
      //     author_list: list_authors,
      //   });
    })
    .catch((err) => {
      return next(err);
    });
};

exports.author_details = async (req, res, next) => {
  try {
    var results = {};
    results["author"] = await Author.findById(req.params.id).exec();
    results["authors_books"] = await Book.find(
      { author: req.params.id },
      "title summary"
    ).exec();

    if (results.author == null) {
      const err = new Error("Author not found");
      err.status = 404;
      return next(err);
    }

    // Successful, so render.
    // console.log(results.author);
    res.json(results.author);
    // res.render("author_detail", {
    //   title: "Author Detail",
    //   author: results.author,
    //   author_books: results.authors_books,
    // });
  } catch (err) {
    return next(err);
  }
};

exports.author_create = (req, res, next) => {
  const author = new Author({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    date_of_birth: req.body.date_of_birth,
    date_of_death: req.body.date_of_death,
    photo: req.body.photo,
  });
  author
    .save()
    .then((data) => {
      // res.json(data);
      // res.sendStatus(200);
      res.sendStatus(200);
    })
    .catch((err) => {
      return next(err);
    });
};

exports.author_delete = async (req, res, next) => {
  try {
    var results = {};
    results["author"] = await Author.findById(req.params.id).exec();
    results["authors_books"] = await Book.find({
      author: req.params.id,
    }).exec();

    if (results.author == null) {
      const err = new Error("Author not found");
      err.status = 404;
      return next(err);
    }
    if (results.authors_books.length > 0) {
      const err = new Error("There are book that holds author name");
      err.status = 404;
      return next(err);
    }
    Author.findByIdAndRemove(req.params.id)
      .then((data) => {
        console.log("removed");
        res.redirect("/author/authors");
      })
      .catch((err) => {
        return next(err);
      });
  } catch (err) {
    return next(err);
  }
};

exports.author_update = async (req, res, next) => {
  try {
    var results = await Author.findById(req.params.id).exec();

    if (results == null) {
      // No results.
      const err = new Error("Author not found");
      err.status = 404;
      return next(err);
    }

    // update Author data
    Author.findByIdAndUpdate(req.params.id, {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      date_of_birth: req.body.date_of_birth,
      date_of_death: req.body.date_of_death,
    })
      .then(() => {
        console.log("updated");
        res.sendStatus(200);
        // res.send("removed");
        // res.redirect(`/author/${req.params.id}`);
      })
      .catch((err) => {
        return next(err);
      });
  } catch (err) {
    return next(err);
  }
};
