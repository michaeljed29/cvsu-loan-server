const jwt = require("jsonwebtoken");
const { get } = require("lodash");

const auth = async (req, res, next) => {
  try {
    const token = get(req, "headers.Authorization", "").split(" ")[1];

    // if (!token)
    //   return res.status(403).json({ message: "Authentication failed." });

    // const decodedData = jwt.verify(token, "testsecret");

    // req.userId = decodedData?.id;
    next();
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = auth;
