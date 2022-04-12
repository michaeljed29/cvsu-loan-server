const UserModel = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { get, omit } = require("lodash");
const generator = require("generate-password");

const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await UserModel.findById(id);

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const createUser = async (req, res) => {
  try {
    const user = req.body;

    const initialPassword = generator.generate({
      length: 6,
      numbers: true,
    });

    const existingUser = await UserModel.findOne({ username: user.username });

    if (existingUser)
      return res.status(404).json({ message: "username name already taken." });

    const hashedPassword = await bcrypt.hash(initialPassword, 12);

    const result = await UserModel.create({
      ...user,
      password: hashedPassword,
      initialPassword,
    });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const value = req.body;

    const newValue = omit(value, ["_id", "password", "createdAt"]);

    const result = await UserModel.findByIdAndUpdate(id, newValue, {
      new: true,
    });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const changePassword = async (req, res) => {
  try {
    const { userId, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModel.findByIdAndUpdate(
      userId,
      { password: hashedPassword },
      {
        new: true,
      }
    );

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Something went wrongs" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await UserModel.findByIdAndRemove(id);

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = req.body;

    const existingUser = await UserModel.findOne({ username: user.username });

    if (!existingUser) return res.json({ message: "User doesn't exist." });

    const isPasswordCorrect = await bcrypt.compare(
      user.password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.json({ message: "Invalid username or password" });

    const token = jwt.sign(
      {
        username: existingUser.usernme,
        id: existingUser._id,
      },
      "testsecret",
      { expiresIn: "24h" }
    );

    res.status(200).json({ ...get(existingUser, "_doc", {}), token });
  } catch (err) {
    console.log(err.message);
    res.json({ message: "Something went wrong" });
  }
};

exports.getUsers = getUsers;
exports.getUser = getUser;
exports.createUser = createUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.loginUser = loginUser;
exports.changePassword = changePassword;
