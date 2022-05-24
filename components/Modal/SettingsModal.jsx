import {
	ActionIcon,
	Box,
	Button,
	Group,
	Modal,
	Tab,
	Tabs,
	TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/hooks";
import React from "react";
import { Tool, User } from "tabler-icons-react";
import { useInfo } from "../../contexts/info";

export default function SettingsModal() {
	const { user } = useInfo();
	const [opened, setOpened] = React.useState(false);

	return (
		<>
			<Modal
				opened={opened}
				onClose={() => setOpened(false)}
				title="Settings"
			>
				<Tabs>
					<Tab label={user.user} icon={<User />}><CurrentUser /></Tab>
					
				</Tabs>
			</Modal>

			<ActionIcon variant="outline" onClick={() => setOpened(true)}>
				<Tool size={18} />
			</ActionIcon>
		</>
	);
}
function CurrentUser() {
	const { user } = useInfo();

	const form = useForm({
		initialValues: {
			user: user.user,
			password: "",
			person: user.person,
			group: user.group,
			image: user.image,
		},
	});

	return (
		<Box>
			<form onSubmit={form.onSubmit((values) => console.log(values))}>
				<TextInput
					required
					label="Device"
					placeholder="Karsten"
					{...form.getInputProps("user")}
				/>
				<TextInput
					required
					label="Password"
                    type="password"
					placeholder="••••••••••••••••"
					{...form.getInputProps("password")}
				/>
				<TextInput
					label="User"
					placeholder="cit116"
					{...form.getInputProps("person")}
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
	);
}