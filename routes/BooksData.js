const express = require("express");

const router = express.Router();

const {
  getBooks,
  addBook,
  updateBookDetails,
  deleteBook,
} = require("../controllers/book");

router.route("/getBooks").get(getBooks);

router.route("/addBook").post(addBook);

router.route("/updateBook").put(updateBookDetails);

router.route("/deleteBook").get(deleteBook);

module.exports = router;
