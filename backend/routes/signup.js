const express = require("express");
const bcrypt = require("bcrypt");
const UserSchema = require("../schema/User.js");
const BalanceSchema = require("../schema/Balance.js");
const jwt = require("jsonwebtoken");
const zod = require("zod");

let router = express.Router();

let schema = zod.object({
	name: zod.string().min(3).max(50),
	email: zod.string().email(),
	password: zod.string().min(6),
});

router.post("/", async (req, res) => {
	let { success } = schema.safeParse(req.body);
	if (!success) {
		res.status(400).send("Invalid data");
		return;
	}
	let { name, email, password } = req.body;
	try {
		let f = await UserSchema.findOne({ email });
		if (f) {
			res.status(409).send("Email already in use.");
			return;
		}
		password = await bcrypt.hash(password, 11);
		let user = await UserSchema.create({
			name,
			email,
			password,
		});
		await user.save();
		let balance = await BalanceSchema.create({
			userId: user._id,
			balance: 50000,
		});
		await balance.save();

		let token =
			"Bearer " +
			jwt.sign({ name, email, _id: user._id }, process.env.privateToken);
		res.json({
			token,
		});
	} catch (err) {
		console.error(err);
	}
});

module.exports = router;
