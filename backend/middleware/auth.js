const jwt = require("jsonwebtoken");

async function VerfiyJWT(req, res, next) {
	let token = req.headers["authorization"];
	if (token == null) {
		res.status(403).json("No auth");
	}
	if (!token.startsWith("Bearer ")) {
		res.status(403).json("Wrong auth");
	}
	token = token.split(" ")[1];
	jwt.verify(token, process.env.privateToken, (error, user) => {
		if (error) {
			res.status(401).json(error);
		} else {
			req.user = user;
			next();
		}
	});
}
module.exports = VerfiyJWT;
