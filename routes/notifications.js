const express = require("express");
const {
  getNotifications,
  getNewNotifications,
  setNotificationStatus,
} = require("../controllers/notifications.js");
const auth = require("./../middleware/auth");

const router = express.Router();

router.get("/", auth, getNotifications);
router.get("/count", auth, getNewNotifications);
router.patch("/:id", auth, setNotificationStatus);

module.exports = router;
