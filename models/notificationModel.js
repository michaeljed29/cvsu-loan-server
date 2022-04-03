const mongoose = require("mongoose");
const Types = mongoose.Schema.Types;

const notificationSchema = mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  seen: {
    type: Boolean,
    default: false,
  },
  approverId: {
    type: Types.ObjectId,
    ref: "User",
  },
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
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
