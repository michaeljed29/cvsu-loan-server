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
  verificationCode: {
    type: String,
  },
  loanType: {
    type: String,
    required: true,
  },
  monthly: {
    type: Number,
    default: 0,
  },
  loanProceedsAmount: {
    type: Number,
    default: 0,
  },
  loanProceedsData: {
    interest: {
      type: Number,
      default: 0,
    },
    serviceFee: {
      type: Number,
      default: 0,
    },
    retention: {
      type: Number,
      default: 0,
    },
    unpaidLoans: {
      type: Number,
      default: 0,
    },
    insurance: {
      type: Number,
      default: 0,
    },
    surcharge: {
      type: Number,
      default: 0,
    },
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
