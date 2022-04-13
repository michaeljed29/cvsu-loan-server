const LoanModel = require("../models/loanModel");
const { createNotification } = require("./utils");
const generator = require("generate-password");

const getLoans = async (req, res) => {
  const { userId, date } = req.query;
  const filter = userId ? { userId } : {};

  if (date) filter.date = date;

  try {
    const loans = await LoanModel.find(filter)
      .populate("userId")
      .sort({ createdAt: -1 });

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

    const verificationCode = generator
      .generate({
        length: 8,
        numbers: true,
      })
      .toUpperCase();

    const result = await LoanModel.create({ ...loan, verificationCode });

    await createNotification(result.userId, result._id, result.status);

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const setLoanStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, approverId } = req.body;

    const result = await LoanModel.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
      }
    );

    await createNotification(result.userId, result._id, status, approverId);

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const setMonthly = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount } = req.body;

    const result = await LoanModel.findByIdAndUpdate(
      id,
      { monthly: amount },
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
exports.setMonthly = setMonthly;
