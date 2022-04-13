const express = require("express");
const {
  getLoans,
  getLoan,
  createLoan,
  setLoanStatus,
  setMonthly,
} = require("../controllers/loans.js");
const auth = require("./../middleware/auth");

const router = express.Router();

router.get("/", auth, getLoans);
router.get("/:id", auth, getLoan);
router.post("/", auth, createLoan);
router.patch("/setMonthly/:id", auth, setMonthly);
router.patch("/:id", auth, setLoanStatus);

module.exports = router;
