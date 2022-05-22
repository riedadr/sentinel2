// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { lookup } = require("geoip-lite");

export default function handler(req, res) {
	let ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
	ip = ip.replace("::1", "").replace("127.0.0.1", "") || "178.24.248.139";
	const location = lookup(ip);

	res.status(200).json({ ip, location });
}
