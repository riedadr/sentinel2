import React, { useRef, useState } from "react";
import Head from "next/head";
import Shell from "../../components/Shell";
import {
	AlertTriangle,
	At,
	Ban,
	BrandInstagram,
	Check,
	Lock,
	Map2,
	Photo,
	QuestionMark,
	Search,
} from "tabler-icons-react";
import {
	ActionIcon,
	Button,
	Card,
	Checkbox,
	Input,
	Loader,
} from "@mantine/core";
import axios from "axios";

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
			<Shell className="user">
				<h1>Username Search</h1>

				<div className="mt-4">
					<form className="mt-2 flex gap-2" onSubmit={start}>
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
				<ul className="flex flex-wrap gap-2 list-none mt-4 mb-4">
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
				{username && <InstaSearch />}
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

	function InstaSearch() {
		const [instagram, setInstagram] = useState(false);
		const [data, setData] = useState();

		React.useEffect(() => {
			if (instagram) {
				console.log("suche");
				const options = {
					method: "GET",
					url: "https://instagram130.p.rapidapi.com/account-info",
					params: { username: username },
					headers: {
						"X-RapidAPI-Host": "instagram130.p.rapidapi.com",
						"X-RapidAPI-Key":
							"9cfe91c0aemsh85402594fda58fdp1eb483jsnb8a2def2a7c4",
					},
				};

				axios
					.request(options)
					.then(function (response) {
						console.log(response.data);
						setData(response.data);
					})
					.catch(function (error) {
						console.error(error);
						window.alert(error);
					});
			}
		}, [instagram]);

		return (
			<Card id="instagram">
				<div className="flex justify-between">
					<h2
						className={
							data && data.is_private
								? "text-red-500"
								: "text-blue-500"
						}
					>
						Instagram
					</h2>
					<Checkbox
						label="Deep Search"
						checked={instagram}
						onChange={(event) =>
							setInstagram(event.currentTarget.checked)
						}
					/>
				</div>

				{instagram && !data && (
					<div className="flex justify-center">
						<Loader />
					</div>
				)}

				{instagram && data && (
					<div className="flex flex-col gap-2  mt-4">
						<div className="flex justify-between">
							<div>
								<h3 className="flex items-center">
									{data.full_name} ({data.username}){" "}
									{data.is_private && (
										<Lock
											className="text-red-500"
											title="private account"
										/>
									)}
								</h3>
								<code>
									ID: {data.id} | FBID: {data.fbid}
								</code>
							</div>
							<div id="counters" className="flex">
								<div className="lined flex flex-col justify-center items-center">
									<strong>
										{
											data.edge_owner_to_timeline_media
												.count
										}
									</strong>
									Posts
								</div>
								<div className="lined flex flex-col justify-center items-center">
									<strong>
										{data.edge_followed_by.count}
									</strong>
									Followers
								</div>
								<div className="flex flex-col justify-center items-center">
									<strong>{data.edge_follow.count}</strong>
									Following
								</div>
							</div>
						</div>
						<p>{data.biography}</p>
						<h4 className="mt-2">Locations of last Posts</h4>
						<ul
							id="locations"
							className="list-none flex gap-2 flex-wrap mb-2"
						>
							{data.edge_owner_to_timeline_media.edges.map(
								(item, index) => {
									return (
										<li
											key={index}
											className="bg-zinc-100 dark:bg-zinc-900 p-2 rounded flex gap-2"
										>
											<div>
												<p>
													<ConvertedDate
														time={
															item.node
																.taken_at_timestamp
														}
													/>
													:
												</p>
												<p>
													{item.node.location
														? item.node.location
																.name
														: "-"}
												</p>
											</div>
											<div>
												<ActionIcon
													component="a"
													href={
														"https://www.instagram.com/p/" +
														item.node.shortcode
													}
													target="_blank"
													rel="noreferrer"
												>
													<Photo />
												</ActionIcon>
												{item.node.location && (
													<ActionIcon
														component="a"
														href={
															"https://www.google.com/maps/search/" +
															item.node.location
																.name
														}
														target="_blank"
														rel="noreferrer"
													>
														<Map2 />
													</ActionIcon>
												)}
											</div>
										</li>
									);
								}
							)}
						</ul>
						<Button
							component="a"
							href={"https://instagram.com/" + data.username}
							target="_blank"
							rel="noreferrer"
							variant="gradient"
							gradient={{ from: "orange", to: "violet", deg: 90 }}
							leftIcon={<BrandInstagram />}
						>
							Open on Instagram
						</Button>
					</div>
				)}
			</Card>
		);

		function ConvertedDate(props) {
			const twoDigits = (value) => {
				if (value.toString().length > 1) return value;
				else return "0" + value;
			};

			let date = new Date(props.time * 1000);

			let day = twoDigits(date.getDate());
			let month = twoDigits(date.getMonth() + 1);
			let year = twoDigits(date.getFullYear());

			let time =
				twoDigits(date.getHours()) + ":" + twoDigits(date.getMinutes());
			let output = day + "." + month + "." + year + " (" + time + ")";

			return <code>{output}</code>;
		}
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
