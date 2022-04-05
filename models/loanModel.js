const mongoose = require("mongoose");
const moment = require("moment");
const Types = mongoose.Schema.Types;

const loanSchema = mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  monthsCount: {
    type: Number,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
  userId: {
    type: Types.ObjectId,
    ref: "User",
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

const Loan = mongoose.model("Loan", loanSchema);

module.exports = Loan;
