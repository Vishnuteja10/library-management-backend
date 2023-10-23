const mongoose = require("mongoose");

const bookDetails = mongoose.Schema({
  bookId: {
    type: Number,
    required: true,
  },
  issuedDate: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  returnDate: {
    type: Date,
  },
});

const customerSchema = mongoose.Schema({
  customerId: {
    type: String,
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  books: [bookDetails],
});

module.exports = mongoose.model("customer", customerSchema);
