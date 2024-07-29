const express = require("express");
const router = express.Router();
const balance = require("../schema/Balance");
const User = require("../schema/User");
const mongoose = require("mongoose");
const Balance = require("../schema/Balance");

router
	.get("/balance", require("../middleware/auth"), async (req, res) => {
		const account = await balance.findOne({
			userId: req.user._id,
		});
		res.json({
			balance: account.balance,
		});
	})
	.post("/sendmoney", require("../middleware/auth"), async (req, res) => {
		const { to, amount } = req.body;
		let session = await mongoose.startSession();
		session.startTransaction();
		try {
			if (amount < 100) {
				await session.abortTransaction();
				res.status(400).send("Minimum Amount is 1");
			}
			let recUser = User.findById(to);
			if (!recUser) {
				await session.abortTransaction();
				res.send("User Not Found.").status(404);
			}
			let balance = await Balance.findOne({ userId: req.user._id });
			if (balance < amount) {
				await session.abortTransaction();
				res.send("Not Enough Balance").status(400);
			}
			await Balance.findOneAndUpdate(
				{ userId: req.user._id },
				{
					$inc: { balance: -amount },
				},
			);
			await Balance.findOneAndUpdate(
				{ userId: to },
				{ $inc: { balance: amount } },
			);
			await session.commitTransaction();
            res.status(200).send("Success");
		} catch (err) {
			await session.abortTransaction();
			res.send("Error");
		}
	});

module.exports = router;
