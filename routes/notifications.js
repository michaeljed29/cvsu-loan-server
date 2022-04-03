const express = require("express");
const {
  getNotifications,
  setNotificationStatus,
} = require("../controllers/notifications.js");
const auth = require("./../middleware/auth");

const router = express.Router();

router.get("/", auth, getNotifications);
router.patch("/:id", auth, setNotificationStatus);

module.exports = router;
