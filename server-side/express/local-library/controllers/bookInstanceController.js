const BookInstance = require("../models/bookinstance");
const Book = require("../models/book");
const async = require("async");

exports.bookinstance_list = (req, res, next) => {
  BookInstance.find()
    .populate("book")
    .exec((err, list_bookinstances) => {
      if (err) {
        return next(err);
      }
      res.render("bookinstance_list", {
        title: "Book Instance List",
        bookinstance_list: list_bookinstances,
      });
    });
};

exports.bookinstance_detail = (req, res, next) => {
  async.parallel(
    BookInstance.findById(req.params.id)
      .populate("book")
      .exec((err, bookinstance) => {
        if (err) {
          return next(err);
        }
        if (bookinstance === null) {
          const err = new Error("Book copy not found.");
          err.status = 404;
          return next(err);
        }
        res.render("bookinstance_detail", {
          title: `Copy: ${bookinstance.book.title}`,
          bookinstance: bookinstance,
        });
      })
  );
};

exports.bookinstance_create_get = (req, res) => {
  res.send("NOT IMPLEMENTED: BookInstance create GET");
};

exports.bookinstance_create_post = (req, res) => {
  res.send("NOT IMPLEMENTED: BookInstance create POST");
};

exports.bookinstance_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: BookInstance delete GET");
};

exports.bookinstance_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: BookInstance delete POST");
};

exports.bookinstance_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: BookInstance update GET");
};

exports.bookinstance_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: BookInstance update POST");
};
