// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { lookup } = require("geoip-lite");

export default function handler(req, res) {
	let ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
	ip = ip.replace("::1", "").replace("127.0.0.1", "") || "141.144.229.104";
	const location = lookup(ip);

	res.status(200).json({ ip, location });
}
