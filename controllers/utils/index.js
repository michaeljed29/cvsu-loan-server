const NotificationModel = require("../../models/notificationModel");

const createNotification = async (userId, loanId, type) => {
  try {
    const result = await NotificationModel.create({ userId, loanId, type });
  } catch (err) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

exports.createNotification = createNotification;
