const Customer = require("../models/Customer");

const getCustomers = async (req, res) => {
  try {
    const query = {};
    const { customerName, bookId } = req.body;

    if (customerName) {
      query.customerName = customerName;
    }
    if (bookId) {
      query.bookId = bookId;
    }
    const customers = await Customer.find(query);
    res.status(400).json({ success: true, data: customers });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const addCustomer = async (req, res) => {
  try {
    const { customerId, customerName, books } = req.body;

    if (!customerId || !customerName || !books) {
      return res
        .status(400)
        .json({ success: false, message: "all fields are required" });
    }

    const customer = new Customer({ customerId, customerName, books });

    await customer.save();
    res.status(200).json({
      success: true,
      message: "customer added successfully",
      customer,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const updateCustomer = async (req, res) => {
  try {
    const id = req.body.customerId;
    const data = req.body;

    const result = await Customer.findByIdAndUpdate(
      { _id: id },
      { $set: data },
      { new: true }
    );

    if (result == null) {
      res.status(400).json({ success: false, message: "No such data found" });
    } else {
      res.status(400).json({
        success: true,
        message: "customer details updated successfully",
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const id = req.body.customerId;
    const result = await Customer.deleteOne({ _id: id });
    if (result?.acknowledged) {
      return res
        .status(200)
        .json({ success: true, message: "customer deleted successfully" });
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

module.exports = { getCustomers, addCustomer, updateCustomer, deleteCustomer };
