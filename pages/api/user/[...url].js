import urlExists from "url-exists-deep";

export default async function handler(request, response) {
	const { url } = request.query;
	let link = url.join().replaceAll(",", "/");
	link = "http://" + link;

	const exists = await urlExists(link);

	if (exists) {
		return response.status(200).json({ found: true, url: exists });
	} else {
		return response.status(200).json({ found: false, url: link });
	}
}
