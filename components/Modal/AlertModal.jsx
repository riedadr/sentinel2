import { ActionIcon, Button, Modal } from '@mantine/core';
import React from 'react'
import { Urgent } from 'tabler-icons-react';

export default function AlertModal() {
	const [opened, setOpened] = React.useState(false);

	return (
		<>
			<Modal
				opened={opened}
				onClose={() => setOpened(false)}
				title="Alert"
			>
				<Button
				component="a"
				href="tel:+4915678679982"
				color="red">
					EMERGENCY
				</Button>
			</Modal>

			<ActionIcon variant="outline" color="red" onClick={() => setOpened(true)}>
				<Urgent size={18} />
			</ActionIcon>
		</>
	);
}
