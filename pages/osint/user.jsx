import React, { useRef, useState } from "react";
import Head from "next/head";
import Shell from "../../components/Shell";
import {
	AlertTriangle,
	At,
	Ban,
	Check,
	QuestionMark,
	Search,
} from "tabler-icons-react";
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
				<ul className="flex flex-wrap gap-2 list-none mt-4">
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
			if (notWorking.includes(props.name)) {
				setStatus("error");
			} else {
				fetch("/api/user/" + profile)
					.then((res) => res.json())
					.then((data) => {
						console.log(props.name, data);
						if (data.found) setStatus("found");
						else setStatus("notFound");
					});
			}
		}, [props.name, profile]);

		if (status === "error") {
			return (
				<Button
					component="a"
					href={"http://" + profile}
					target="_blank"
					rel="noreferrer"
					color="yellow"
					leftIcon={<AlertTriangle className="w-6" />}
				>
					{props.name}
				</Button>
			);
		}

		if (status === "found") {
			return (
				<Button
					component="a"
					href={"http://" + profile}
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
					href={"http://" + profile}
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
				href={"http://" + profile}
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

const notWorking = ["Instagram", "Twitter", "Steam"];
const urls = [
	{
		name: "Instagram",
		url: "instagram.com/",
	},
	{
		name: "Twitter",
		url: "twitter.com/",
	},
	{
		name: "Reddit",
		url: "www.reddit.com/user/",
	},
	{
		name: "GitHub",
		url: "github.com/",
	},
	{
		name: "Steam",
		url: "steamcommunity.com/id/",
	},
	{
		name: "gutefrage",
		url: "www.gutefrage.net/nutzer/",
	},
];
