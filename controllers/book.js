const Book = require("../models/Book");

// get the books based on user query
const getBooks = async (req, res) => {
  try {
    // get bookId, bookName ,category details from user
    const { bookId, bookName, category } = req.body;
    const query = {};

    // query the book from database using bookId
    if (bookId) {
      query.bookId = bookId;
    }

    // query the book from database using bookName
    if (bookName) {
      query.bookName = bookName;
    }

    // query book from database based on category
    if (category) {
      query.category = category;
    }

    const BookData = await Book.find(query);

    res.json({ success: true, data: BookData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// add book to library
const addBook = async (req, res) => {
  try {
    const { bookId, bookName, author, category, price, quantity } = req.body;
    if (!bookId || !bookName || !author || !category || !price || !quantity) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required!" });
    }

    const book = new Book({
      bookId,
      bookName,
      author,
      category,
      price,
      quantity,
    });
    await book.save();

    res
      .status(200)
      .json({ success: true, message: "book added successfully", book });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: "internal server error",
      error: error.message,
    });
  }
};

// update the book details
const updateBookDetails = async (req, res) => {
  try {
    const id = req.body.bookId;
    const data = req.body;

    const result = await Book.findByIdAndUpdate(
      { _id: id },
      { $set: data },
      { new: true }
    );
    if (result == null) {
      res.status(400).json({ success: false, message: "No such data found" });
    } else {
      res
        .status(400)
        .json({ success: true, message: "Book details updated", result });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// delete book item
const deleteBook = async (req, res) => {
  try {
    const id = req.body.bookId;

    const result = await Book.deleteOne({ _id: id });

    if (result?.acknowledged) {
      return res
        .status(200)
        .json({ success: true, message: "book item deleted successfully" });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "No such data found" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error",
      error: error.message,
    });
  }
};

module.exports = { getBooks, addBook, updateBookDetails, deleteBook };
