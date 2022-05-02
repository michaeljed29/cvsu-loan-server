const PaymentModel = require("../models/paymentModel");
const LoanModel = require("../models/loanModel");

const getPayments = async (req, res) => {
  const { userId, loanId } = req.query;

  const filter =
    userId || loanId
      ? {
          userId,
          loanId,
        }
      : {};

  try {
    const payments = await PaymentModel.find(filter)
      .populate("userId")
      .populate("loanId")
      .sort({ createdAt: -1 });
    res.status(200).json(payments);
  } catch (err) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

const createPayment = async (req, res) => {
  const payment = req.body;

  const loan = await LoanModel.findById(payment.loanId);

  const payments = await PaymentModel.find({
    loanId: payment.loanId,
    userId: payment.userId,
  });

  const currentTotalAmountPaid = payments.reduce(
    (total, payment) => total + payment.amount,
    0
  );

  const remainingBalance =
    loan.amount - (payment.amount + currentTotalAmountPaid);

  try {
    const result = await PaymentModel.create({ ...payment, remainingBalance });

    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

exports.getPayments = getPayments;
exports.createPayment = createPayment;
