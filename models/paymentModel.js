const mongoose = require("mongoose");
const Types = mongoose.Schema.Types;
const moment = require("moment");

const paymentSchema = mongoose.Schema({
  loanId: {
    type: Types.ObjectId,
    ref: "Loan",
    required: true,
  },
  userId: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  remainingBalance: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  date: {
    type: String,
    default: moment().format("YYYY-MM-DD"),
  },
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
