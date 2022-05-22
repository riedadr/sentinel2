import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			default: "Nobody",
		},
		password: {
			type: String,
		},
		person: {
			type: String,
		},
		group: {
			type: String,
		},
		image: {
			type: String,
			default: "https://github.com/riedadr.png",
		},
	},
	{ timestamps: true }
);

let Dataset = mongoose.models.users || mongoose.model("users", userSchema);
export default Dataset;