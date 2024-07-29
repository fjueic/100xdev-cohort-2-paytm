const express = require("express");
const bcrypt = require("bcrypt");
const UserSchema = require("../schema/User");
const jwt = require("jsonwebtoken");
const zod = require("zod");

let router = express.Router();

let schema = zod.object({
	email: zod.string().email(),
	password: zod.string().min(6),
});

router.post("/", async (req, res) => {
	const { success } = schema.safeParse(req.body);
	if (!success) {
		res.status(400).send("Invalid data");
		return;
	}
	let { email, password } = req.body;
	try {
		let user = await UserSchema.findOne({ email });
		if (user) {
			if (bcrypt.compareSync(password, user.password)) {
				let token =
					"Bearer " +
					jwt.sign(
						{
							name: user.name,
							email,
							_id: user._id,
						},
						process.env.privateToken,
					);
				res.json({
					token,
				});
				return;
			}
		}
		res.status(401).send("Wrong email or password");
	} catch (err) {}
});

module.exports = router;
