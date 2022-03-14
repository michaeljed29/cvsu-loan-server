const LoanModel = require("../models/loanModel");

const getLoans = async (req, res) => {
  try {
    const loans = await LoanModel.find().populate("userId");
    res.status(200).json(loans);
  } catch (err) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

const getLoan = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await LoanModel.findById(id).populate("userId");

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const createLoan = async (req, res) => {
  try {
    const loan = req.body;

    const result = await LoanModel.create(loan);

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const setLoanStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await LoanModel.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
      }
    );

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.getLoans = getLoans;
exports.getLoan = getLoan;
exports.createLoan = createLoan;
exports.setLoanStatus = setLoanStatus;
