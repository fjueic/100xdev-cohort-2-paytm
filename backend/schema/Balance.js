const mongoose = require("mongoose");

const BalanceSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	balance: {
		type: Number,
		required: true,
	},
});

module.exports = mongoose.model("balance", BalanceSchema);
