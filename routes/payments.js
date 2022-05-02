const express = require("express");
const { getPayments, createPayment } = require("../controllers/payments.js");
const auth = require("./../middleware/auth");

const router = express.Router();

router.get("/", auth, getPayments);
router.post("/", auth, createPayment);

module.exports = router;
