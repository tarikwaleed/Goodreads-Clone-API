
const Book = require('../models/book.model');

//// Display detail page for a specific book.
exports.book_details = (req, res, next) => {
    Book.findById(req.params.id)
        .populate('author')
        .populate('genre')
        .populate('reviews')
        // .populate('ratings')
        .populate('averageRating')
        .populate('ratingCount')
        .exec((err, book) => {
            if (err) {
                return next(err);
            }
            if (book == null) {
                // No results.
                const err = new Error('Book not found');
                err.status = 404;
                return next(err);
            }
            // Successful, so render.
            res.render('book_detail', { title: book.title, book });
        });
};

// // Display list of all books.
// exports.book_list = (req, res, next) => {
//     Book.find()
//         .populate('author')
//         .populate('genre')
//         .exec((err, book_list) => {
//             if (err) {
//                 return next(err);
//             }
            // Successful, so render
//             res.render('book_list', { title: 'Book List', book_list });
//         });
// };



// // Handle book create on POST.
// exports.book_create = (req, res, next) => {
//     // Validate and sanitize fields.
//     // ...

//     // Create new Book object.
//     const book = new Book({
//         title: req.body.title,
//         author: req.body.author,
//         summary: req.body.summary,
//         isbn: req.body.isbn,
//         genre: req.body.genre,
//         image: req.body.image,
//     });

//     // Save book.
//     book.save((err) => {
//         if (err) {
//             return next(err);
//         }
//         // Successful, so redirect to new book's detail page.
//         res.redirect(book.url);
//     });
// };

// // Display book delete form on GET.
// exports.book_delete_get = (req, res, next) => {
//     Book.findById(req.params.id)
//         .populate('author')
//         .populate('genre')
//         .exec((err, book) => {
//             if (err) {
//                 return next(err);
//             }
//             if (book == null) {
//                 // No results.
//                 res.redirect('/catalog/books');
//             }
//             // Successful, so render.
//             res.render('book_delete', { title: 'Delete Book', book });
//         });
// };

// // Handle book delete on POST.
// exports.book_delete = (req, res, next) => {
//     Book.findByIdAndRemove(req.body.bookid, (err) => {
//         if (err) {
//             return next(err);
//         }
//         // Success - go to book list.
//         res.redirect('/catalog/books');
//     });
// };

// // Display book update form on GET.
// exports.book_update = (req, res, next) => {
//     Book.findById(req.params.id)
//         .populate('author')
//         .populate('genre')
//         .exec((err, book) => {
//             if (err) {
//                 return next(err);
//             }
//             if (book == null) {
//                 // No results.
//                 const err = new Error('Book not found');
//                 err.status = 404;
//                 return next(err);
//             }
//             // Successful, so render.
//             res.render('book_form', { title: 'Update Book', book });
//         });
// };

// exports.book_update_post = function (req, res) {
//     Book.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, book) {
//         if (err) return next(err);
//         res.send('Book updated.');
//     });
// };
