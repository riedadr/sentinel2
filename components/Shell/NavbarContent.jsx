import {
	Accordion,
	Avatar,
	Box,
	Button,
	Group,
	Navbar,
	Text,
	UnstyledButton,
	useMantineTheme,
} from "@mantine/core";
import Link from "next/link";
import React from "react";
import { ChevronLeft, ChevronRight } from "tabler-icons-react";
import { pagesOSINT } from "./pagesOSINT";

export default function NavbarContent() {
	return (
		<>
			<Navbar.Section>QuickLink</Navbar.Section>
			<Navbar.Section grow mt="md">
				<Accordion>
					<Accordion.Item label="OSINT">
						<div className="flex gap-2 flex-wrap">
							{pagesOSINT.map((item, index) => {
								return (
									<Link key={index} href={item.link} passHref>
										<Button
											variant="gradient"
											gradient={{
												from: "teal",
												to: "blue",
												deg: 60,
											}}
										>
											{item.name}
										</Button>
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
					<Avatar src="https://github.com/riedadr.png" radius="xl" />
					<Box sx={{ flex: 1 }}>
						<Text size="sm" weight={500}>
							Karsten
						</Text>
						<Text color="dimmed" size="xs">
							cit116@sentinel
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
