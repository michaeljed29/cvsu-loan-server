const NotificationModel = require("../models/notificationModel");

const getNotifications = async (req, res) => {
  const { userId } = req.query;

  const filter = userId
    ? { userId, type: { $ne: "type" } }
    : { type: "pending" };

  try {
    const notifications = await NotificationModel.find(filter)
      .populate("userId")
      .populate("loanId")
      .populate("approverId")
      .sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (err) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

const setNotificationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { seen } = req.query;

    const result = await NotificationModel.findByIdAndUpdate(
      id,
      { seen },
      {
        new: true,
      }
    );

    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

exports.getNotifications = getNotifications;
exports.setNotificationStatus = setNotificationStatus;
