import mongoose from "mongoose";

const uri = "mongodb+srv://sentinel:cit116MONGODB@cluster0.x87mp.mongodb.net/?retryWrites=true&w=majority"

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
