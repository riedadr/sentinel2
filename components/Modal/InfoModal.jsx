import { ActionIcon, Modal } from '@mantine/core';
import React from 'react'
import { InfoCircle } from 'tabler-icons-react';
import Info from '../Info';

export default function InfoModal() {
	const [opened, setOpened] = React.useState(false);

	return (
		<>
			<Modal
				opened={opened}
				onClose={() => setOpened(false)}
				title="Information"
			>
				<Info />
			</Modal>

			<ActionIcon variant="outline" onClick={() => setOpened(true)}>
				<InfoCircle size={18} />
			</ActionIcon>
		</>
	);
}
