const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  bookId: {
    type: Number,
    required: true,
  },
  bookName: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Book", bookSchema);
