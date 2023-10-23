const express = require("express");
const router = express.Router();

const {
  getCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customer");

router.route("/getCustomers").get(getCustomers);

router.route("/addCustomer").post(addCustomer);

router.route("/updateCustomer").put(updateCustomer);

router.route("/deleteCustomer").get(deleteCustomer);

module.exports = router;
