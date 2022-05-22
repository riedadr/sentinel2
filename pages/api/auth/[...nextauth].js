// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "./lib/mongodb";
import CredentialsProvider from "next-auth/providers/credentials";
import Users from "../../models/userModel";
import { connectDB } from "./lib/connectDB";
import bcrypt from "bcrypt";
connectDB();

export default NextAuth({
	//  adapter: MongoDBAdapter(clientPromise),

	providers: [
		CredentialsProvider({
			// The name to display on the sign in form (e.g. "Sign in with...")
			name: "Credentials",

			credentials: {
				username: {
					label: "Username",
					type: "text",
					placeholder: "jsmith",
				},
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials, req) {
				// Add logic here to look up the user from the credentials supplied
				const username = credentials.username;
				const password = credentials.password;
				const user = await Users.findOne(username);

				if (!user) {
					throw new Error("User not available");
				}
				if (user) {
					return signInUser({ password, user });
				}
			},
		}),
	],
	
	secret: "secret",
	database: process.env.MONGODB_URI,
});

const signInUser = async ({ password, user }) => {
	if (!user.password) {
		throw new Error("No Password given");
	}
	const isMatch = await bcrypt.compare(password, user);
	if (!isMatch) throw new Error("Password not correct");
	return user;
};
