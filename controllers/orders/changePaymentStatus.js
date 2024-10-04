const { updatePaymentStatus } = require("./updateOrder");

const changePaymentStatus = async (req, res) => {
  const { id } = req.params;
  try {
    await updatePaymentStatus(id, "Сплачено");

    return res
      .status(200)
      .json({ message: "Payment status updated successfully" });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Failed to update payment status",
      error: error.message,
    });
  }
};
module.exports = changePaymentStatus;
