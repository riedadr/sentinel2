import React from "react";
import Shell from "./Shell";
import { PrismaClient } from "@prisma/client";
import {
	Avatar,
	Box,
	Button,
	Group,
	Text,
	TextInput,
	UnstyledButton,
	useMantineTheme,
} from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { Trash } from "tabler-icons-react";

const prisma = new PrismaClient();

export async function getServerSideProps() {
	const users = await prisma.user.findMany();
	return {
		props: {
			users,
		}, // will be passed to the page component as props
	};
}

async function addUser(userData) {
	const response = await fetch("/api/admin/add", {
		method: "POST",
		body: JSON.stringify(userData),
	});

	if (!response.ok) {
		throw new Error(response.statusText);
	}

	return response.json();
}

export default function Admin(props) {
	return (
		<>
			<h1>Admin</h1>
			<Users users={props.users} />
		</>
	);
}

function Users(props) {
	const theme = useMantineTheme();
	const [users, setUsers] = React.useState(props.users);
	const [mounted, setMounted] = React.useState(false);
	const form = useForm({
		initialValues: {
			username: "",
			password: "",
			role: "",
			group: "",
			image: "",
		},
	});

	React.useEffect(() => {
		setMounted(true);
	}, []);

	if (mounted) {
		return (
			<>
				<div>
					<h2>alle Nutzer</h2>
					<ul className="w-full">
						{users.map((user, index) => {
							return (
								<li key={index}>
									
									<button
										className="bg-transparent border-none w-full"
										onClick={() => {
											if (window.confirm(`Soll der Nutzer ${user.id}:"${user.username}" entfernt werden?`)) {

												fetch(`/api/admin/${user.id}`, {
													method: "DELETE",
												}).then((res) => {
												console.log(res);
												setUsers(
													users.filter(function (
														item
													) {
														return (
															item.id !== user.id
															);
														})
														);
													});
												}}
											}
									>
										<Box
										>
											<UnstyledButton
												sx={{
													display: "block",
													width: "100%",
													padding: theme.spacing.xs,
													borderRadius:
														theme.radius.sm,
													color:
														theme.colorScheme ===
														"dark"
															? theme.colors
																	.dark[0]
															: theme.black,

													"&:hover": {
														backgroundColor:
															theme.colorScheme ===
															"dark"
																? theme.colors
																		.dark[6]
																: theme.colors
																		.gray[0],
													},
												}}
											>
												<Group>
													<Avatar
														src={user.image}
														radius="xl"
													/>
													<Box sx={{ flex: 1 }}>
														<Text
															size="sm"
															weight={500}
														>
															{user.username}
														</Text>
														<Text
															color="dimmed"
															size="xs"
														>
															{user.role}@
															{user.group}
														</Text>
													</Box>

													<Trash />
												</Group>
											</UnstyledButton>
										</Box>
									</button>
								</li>
							);
						})}
					</ul>
				</div>

				<Box>
					<form
						onSubmit={form.onSubmit(async (values) => {
							console.log(values);
							await addUser(values);
							setUsers([...users, values]);
						})}
					>
						<TextInput
							required
							label="User"
							placeholder="Karsten"
							{...form.getInputProps("username")}
						/>
						<TextInput
							required
							label="Password"
							type="password"
							placeholder="••••••••••••••••"
							{...form.getInputProps("password")}
						/>
						<TextInput
							label="Role"
							placeholder="cit116"
							{...form.getInputProps("role")}
						/>
						<TextInput
							label="Group"
							placeholder="sentinel"
							{...form.getInputProps("group")}
						/>
						<TextInput
							label="Image"
							placeholder="https://github.com/riedadr.png"
							{...form.getInputProps("image")}
						/>

						<Group position="right" mt="md">
							<Button type="submit">Submit</Button>
						</Group>
					</form>
				</Box>
			</>
		);
	}
}
