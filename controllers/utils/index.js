const NotificationModel = require("../../models/notificationModel");

const createNotification = async (userId, loanId, type, approverId) => {
  try {
    const result = await NotificationModel.create({
      userId,
      loanId,
      type,
      approverId,
    });
  } catch (err) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

exports.createNotification = createNotification;
