import React, { useRef, useState } from "react";
import Head from "next/head";
import Shell from "../../components/Shell";
import { At, Ban, Check, QuestionMark, Search } from "tabler-icons-react";
import { Button, Input, Loader } from "@mantine/core";

export default function UserSearch() {
	const userRef = useRef(null);
	const [username, setUsername] = useState();

	function start(e) {
		e.preventDefault();
		setUsername(userRef.current.value);
	}

	return (
		<>
			<Head>
				<title>User Search</title>
			</Head>
			<Shell>
				<h1>Username Search</h1>
				<p>
					This tool links to the profile page of a certain user on
					different websites and social networks. Caused by the
					CORS-policy the <span className="text-red-500">tool is unable to show the existence</span> of a
					profile directly on this page.
				</p>
				<div className="mt-4">
					<form className="flex gap-2" onSubmit={start}>
						<Input
							className="w-full"
							icon={<At />}
							placeholder="username"
							ref={userRef}
						/>
						<Button type="submit">
							<Search />
						</Button>
					</form>
				</div>
				<ul className="flex gap-2 list-none mt-4">
					{urls.map((item, index) => {
						if (username) {
							return (
								<li key={index}>
									<Profile name={item.name} url={item.url} />
								</li>
							);
						}
						return (
							<li key={index}>
								<Button
									color="gray"
									disabled
									leftIcon={<QuestionMark />}
								>
									{item.name}
								</Button>
							</li>
						);
					})}
				</ul>
			</Shell>
		</>
	);

	function Profile(props) {
		const [status, setStatus] = useState("loading");
		let profile = props.url + username;

		React.useEffect(() => {
			fetch(profile, { method: "HEAD", mode: "no-cors" }).then((res) => {
				console.log(props.name, res);
				setStatus(res.ok ? "found" : "notFound");
			});
		}, []);

		if (status === "found") {
			return (
				<Button
					component="a"
					href={profile}
					target="_blank"
					rel="noreferrer"
					color="green"
					leftIcon={<Check className="w-6" />}
				>
					{props.name}
				</Button>
			);
		}

		if (status === "notFound") {
			return (
				<Button
					component="a"
					href={profile}
					target="_blank"
					rel="noreferrer"
					color="red"
					leftIcon={<Ban className="w-6" />}
				>
					{props.name}
				</Button>
			);
		}

		return (
			<Button
				component="a"
				href={profile}
				target="_blank"
				rel="noreferrer"
				color="gray"
				leftIcon={<Loader className="w-6" />}
			>
				{props.name}
			</Button>
		);
	}
}

const urls = [
	{
		name: "Instagram",
		url: "https://instagram.com/",
	},
	{
		name: "Twitter",
		url: "https://twitter.com/",
	},
	{
		name: "Reddit",
		url: "https://www.reddit.com/user/",
	},
	{
		name: "GitHub",
		url: "https://github.com/",
	},
	{
		name: "Steam",
		url: "https://steamcommunity.com/id/",
	},
];
