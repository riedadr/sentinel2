// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { lookup } = require("geoip-lite");

export default function handler(req, res) {
	const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const location = lookup(ip);


	res.status(200).json({ ip, location });
}
