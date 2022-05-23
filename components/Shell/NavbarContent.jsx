import {
	Accordion,
	ActionIcon,
	Avatar,
	Box,
	Button,
	Group,
	Modal,
	Navbar,
	Tab,
	Tabs,
	Text,
	ThemeIcon,
	UnstyledButton,
	useMantineTheme,
} from "@mantine/core";
import Link from "next/link";
import React from "react";
import {
	ChevronLeft,
	ChevronRight,
	Tool,
	Urgent,
	User,
	UserPlus,
} from "tabler-icons-react";
import { pagesOSINT } from "./pagesOSINT";
import { useInfo } from "../../contexts/info";
import InfoModal from "../Modal/InfoModal";
import SettingsModal from "../Modal/SettingsModal";
import AlertModal from "../Modal/AlertModal";
import ThemeSwitch from "../ThemeSwitch";


export default function NavbarContent() {
	return (
		<>
			<Navbar.Section>
				<div className="flex gap-4">
					<AlertModal />
					<InfoModal />
					<SettingsModal />
					<ThemeSwitch />
				</div>
			</Navbar.Section>
			<Navbar.Section grow mt="md">
				<Accordion>
					<Accordion.Item label="OSINT">
						<div className="flex gap-2 flex-wrap">
							{pagesOSINT.map((item, index) => {
								return (
									<Link key={index} href={item.link} passHref>
										<UnstyledButton
											sx={(theme) => ({
												display: "block",
												width: "100%",
												padding: theme.spacing.xs,
												borderRadius: theme.radius.sm,
												color:
													theme.colorScheme === "dark"
														? theme.colors.dark[0]
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
											})}
										>
											<Group>
												<ThemeIcon
													className="p-0.5"
													color="orange"
													variant="light"
												>
													{item.icon}
												</ThemeIcon>
												<Text size="sm">
													{item.name}
												</Text>
											</Group>
										</UnstyledButton>
									</Link>
								);
							})}
						</div>
					</Accordion.Item>
				</Accordion>
			</Navbar.Section>
			<Navbar.Section>
				<UserContent />
			</Navbar.Section>
		</>
	);
}

function UserContent() {
	const { user } = useInfo();
	const theme = useMantineTheme();

	return (
		<Box
			sx={{
				paddingTop: theme.spacing.sm,
				borderTop: `1px solid ${
					theme.colorScheme === "dark"
						? theme.colors.dark[4]
						: theme.colors.gray[2]
				}`,
			}}
		>
			<UnstyledButton
				sx={{
					display: "block",
					width: "100%",
					padding: theme.spacing.xs,
					borderRadius: theme.radius.sm,
					color:
						theme.colorScheme === "dark"
							? theme.colors.dark[0]
							: theme.black,

					"&:hover": {
						backgroundColor:
							theme.colorScheme === "dark"
								? theme.colors.dark[6]
								: theme.colors.gray[0],
					},
				}}
			>
				<Group>
					<Avatar src={user.image} radius="xl" />
					<Box sx={{ flex: 1 }}>
						<Text size="sm" weight={500}>
							{user.user}
						</Text>
						<Text color="dimmed" size="xs">
							{user.role}@{user.group}
						</Text>
					</Box>

					{theme.dir === "ltr" ? (
						<ChevronRight size={18} />
					) : (
						<ChevronLeft size={18} />
					)}
				</Group>
			</UnstyledButton>
		</Box>
	);
}
