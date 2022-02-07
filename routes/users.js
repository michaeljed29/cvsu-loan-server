const express = require("express");
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  loginUser,
  deleteUser,
} = require("../controllers/users.js");
const auth = require("./../middleware/auth");

const router = express.Router();

router.get("/", auth, getUsers);
router.get("/:id", auth, getUser);
router.post("/", auth, createUser);
router.patch("/:id", auth, updateUser);
router.delete("/:id", auth, deleteUser);
router.post("/login", loginUser);

module.exports = router;
