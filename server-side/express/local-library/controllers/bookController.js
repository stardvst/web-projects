const Book = require("../models/book");
const Author = require("../models/author");
const Genre = require("../models/genre");
const BookInstance = require("../models/bookinstance");
const async = require("async");
const { body, validationResult } = require("express-validator");

exports.index = (req, res) => {
  async.parallel(
    {
      book_count: (callback) => {
        Book.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
      },
      book_instance_count: (callback) => {
        BookInstance.countDocuments({}, callback);
      },
      book_instance_available_count: (callback) => {
        BookInstance.countDocuments({ status: "Available" }, callback);
      },
      author_count: (callback) => {
        Author.countDocuments({}, callback);
      },
      genre_count: (callback) => {
        Genre.countDocuments({}, callback);
      },
    },
    (err, results) => {
      res.render("index", {
        title: "Local Library Home",
        error: err,
        data: results,
      });
    }
  );
};

exports.book_list = (req, res, next) => {
  Book.find({}, "title author")
    .populate("author")
    .exec((err, list_books) => {
      if (err) {
        return next(err);
      }
      res.render("book_list", {
        title: "Book List",
        book_list: list_books,
      });
    });
};

exports.book_detail = (req, res, next) => {
  async.parallel(
    {
      book: (callback) => {
        Book.findById(req.params.id)
          .populate("author")
          .populate("genre")
          .exec(callback);
      },
      book_instances: (callback) => {
        BookInstance.find({ book: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.book === null) {
        const err = new Error("Book not found.");
        err.status = 404;
        return next(err);
      }
      res.render("book_detail", {
        title: "Book Detail",
        book: results.book,
        book_instances: results.book_instances,
      });
    }
  );
};

exports.book_create_get = (req, res) => {
  async.parallel(
    {
      authors: (cb) => {
        Author.find(cb);
      },
      genres: (cb) => {
        Genre.find(cb);
      },
    },
    (err, results) => {
      if (err) return next(err);
      res.render("book_form", {
        title: "Create Book",
        authors: results.authors,
        genres: results.genres,
      });
    }
  );
};

exports.book_create_post = [
  (req, res, next) => {
    // required for sanitization
    if (!(req.body.genre instanceof Array)) {
      if (typeof req.body.genre === "undefined") {
        req.body.genre = [];
      } else {
        req.body.genre = new Array(req.body.genre);
      }
    }
    next();
  },

  body("title", "Title must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("author", "Author must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("summary", "Summary must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("isbn", "ISBN must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("genre.*").escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      summary: req.body.summary,
      isbn: req.body.isbn,
      genre: req.body.genre,
    });

    if (!errors.isEmpty()) {
      async.parallel(
        {
          authors: (cb) => {
            Author.find(cb);
          },
          genres: (cb) => {
            Genre.find(cb);
          },
        },
        (err, results) => {
          if (err) return next(err);

          for (let i = 0; i < results.genres.length; i++) {
            if (book.genre.indexOf(results.genres[i]._id) > -1) {
              results.genres[i].checked = "true";
            }
          }
          res.render("book_form", {
            title: "Create Book",
            authors: results.authors,
            genres: results.genres,
            book: book,
            errors: errors.array(),
          });
        }
      );
      return;
    }

    book.save((err) => {
      if (err) return next(err);
      res.redirect(book.url);
    });
  },
];

exports.book_delete_get = (req, res, next) => {
  Book.findById(req.params.id).exec((err, book) => {
    if (err) return next(err);
    if (book === null) {
      res.redirect("/catalog/books");
    } else {
      res.render("book_delete", {
        title: "Delete Book",
        book: book,
      });
    }
  });
};

exports.book_delete_post = (req, res, next) => {
  Book.findByIdAndRemove(req.params.id).exec((err) => {
    if (err) return next(err);
    res.redirect("/catalog/books");
  });
};

exports.book_update_get = (req, res, next) => {
  async.parallel(
    {
      book: (cb) => {
        Book.findById(req.params.id)
          .populate("author")
          .populate("genre")
          .exec(cb);
      },
      authors: (cb) => {
        Author.find(cb);
      },
      genres: (cb) => {
        Genre.find(cb);
      },
    },
    (err, results) => {
      if (err) return next(err);
      if (results.book === null) {
        const err = new Error("Book not found.");
        err.status = 404;
        return next(err);
      }

      for (let allIter = 0; allIter < results.genres.length; ++allIter) {
        for (
          let bookIter = 0;
          bookIter < results.book.genre.length;
          ++bookIter
        ) {
          if (
            results.genres[allIter]._id.toString() ===
            results.book.genre[bookIter]._id.toString()
          ) {
            results.genres[allIter].checked = "true";
          }
        }
      }

      res.render("book_form", {
        title: "Update Book",
        authors: results.authors,
        genres: results.genres,
        book: results.book,
      });
    }
  );
};

exports.book_update_post = [
  (req, res, next) => {
    // required for sanitization
    if (!(req.body.genre instanceof Array)) {
      if (typeof req.body.genre === "undefined") {
        req.body.genre = [];
      } else {
        req.body.genre = new Array(req.body.genre);
      }
    }
    next();
  },

  body("title", "Title must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("author", "Author must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("summary", "Summary must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("isbn", "ISBN must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("genre.*").escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      summary: req.body.summary,
      isbn: req.body.isbn,
      genre: req.body.genre,
      _id: req.params.id, // this is required, otherwise new ID will be assigned!
    });

    if (!errors.isEmpty()) {
      async.parallel(
        {
          authors: (cb) => {
            Author.find(cb);
          },
          genres: (cb) => {
            Genre.find(cb);
          },
        },
        (err, results) => {
          if (err) return next(err);

          for (let i = 0; i < results.genres.length; i++) {
            if (book.genre.indexOf(results.genres[i]._id) > -1) {
              results.genres[i].checked = "true";
            }
          }
          res.render("book_form", {
            title: "Update Book",
            authors: results.authors,
            genres: results.genres,
            book: book,
            errors: errors.array(),
          });
        }
      );
      return;
    }

    Book.findByIdAndUpdate(req.params.id, book, {}, (err, updated_book) => {
      if (err) return next(err);
      res.redirect(updated_book.url);
    });
  },
];
