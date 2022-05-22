import mongoose from "mongoose";

const uri = "mongodb://mongodb.cit116.xyz:27017"

export const connectDB = () => {
	if (mongoose.connections[0].readyState) {
		console.log("already connected!");
		return;
	}

	mongoose.connect(uri, {}, (err) => {
		if (err) throw err;
		console.log("Connection successfully");
	});
};
