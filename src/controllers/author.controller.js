const Author = require("../models/author.model");
const Book = require("../models/book.model");
const { body, validationResult } = require("express-validator");

// Display list of all Authors.
exports.author_list = function (req, res, next) {
  Author.find()
    .sort([["family_name", "ascending"]])
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

// Display detail page for a specific Author.
exports.author_detail = async (req, res, next) => {
  try {
    var results = {};
    results["author"] = await Author.findById(req.params.id).exec();
    results["authors_books"] = await Book.find(
      { author: req.params.id },
      "title summary"
    ).exec();

    if (results.author == null) {
      // No results.
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

// Handle Author create on POST.
exports.author_create_post = (req, res, next) => {
  // Data from form is valid.

  // Create an Author object with escaped and trimmed data.
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
  // Successful - redirect to new author record.
};

// Handle Author delete on POST.
exports.author_delete = async (req, res, next) => {
  try {
    var results = {};
    results["author"] = await Author.findById(req.params.id).exec();
    results["authors_books"] = await Book.find({
      author: req.params.id,
    }).exec();

    if (results.author == null) {
      // No results.
      const err = new Error("Author not found");
      err.status = 404;
      return next(err);
    }
    // Success
    if (results.authors_books.length > 0) {
      // Author has books. Render in same way as for GET route.
      // res.render("author_delete", {
      //   title: "Delete Author",
      //   author: results.author,
      //   author_books: results.authors_books,
      // });
      const err = new Error("There are book that holds author name");
      err.status = 404;
      return next(err);
    }
    // Author has no books. Delete object and redirect to the list of authors.
    Author.findByIdAndRemove(req.params.id)
      .then((data) => {
        // Success - go to author list
        // res.sendStatus(200);
        // res.send("removed");
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

// Handle Author update on POST.
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
        // Success - go to author list
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

// Display Author create form on GET.  //not implementing
exports.author_create_get = (req, res, next) => {
  res.render("author_form", { title: "Create Author" });
};

// Display Author delete form on GET. //not implementing
exports.author_delete_get = async (req, res, next) => {
  try {
    var results = {};
    results["author"] = await Author.findById(req.params.id).exec();
    results["authors_books"] = await Book.find({
      author: req.params.id,
    }).exec();

    if (results.author == null) {
      // No results.
      res.redirect("/catalog/authors");
    }
    // Successful, so render.
    res.render("author_delete", {
      title: "Delete Author",
      author: results.author,
      author_books: results.authors_books,
    });
  } catch (err) {
    return next(err);
  }
};
// Display Author update form on GET.  //not implementing
exports.author_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Author update GET");
};
