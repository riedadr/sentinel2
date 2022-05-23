import React from "react";
import Shell from "../components/Shell";
import { PrismaClient } from "@prisma/client";
import { Box, Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/hooks";

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

	return await response.json();
}

export default function admin(props) {
	return (
		<Shell>
			<h1>Admin</h1>
			<Users users={props.users} />
		</Shell>
	);
}

function Users(props) {
	const [users, setUsers] = React.useState(props.users)
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
					<table className="w-full">
						<thead className="text-left">
							<tr>
								<th>id</th>
								<th>username</th>
								<th>password</th>
								<th>role</th>
								<th>group</th>
								<th>image</th>
							</tr>
						</thead>
						<tbody>
							{users.map((user, index) => {
								return (
									<tr key={index}>
										<td>{user.id}</td>
										<td>{user.username}</td>
										<td>{user.password}</td>
										<td>{user.role}</td>
										<td>{user.group}</td>
										<td>img</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>

				<Box>
					<form
						onSubmit={form.onSubmit( async (values) => {
							console.log(values);
							await addUser(values);
							setUsers([...users, values])

						}
						)}
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
