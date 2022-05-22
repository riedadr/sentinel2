import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import {
	AppShell,
	Navbar,
	Header,
	Aside,
	Text,
	MediaQuery,
	Burger,
	useMantineTheme,
	ScrollArea,
	ActionIcon,
	useMantineColorScheme,
} from "@mantine/core";
import NavbarContent from "./Shell/NavbarContent";
import { Sun, MoonStars } from "tabler-icons-react";
import Info from "./Info";
import {Logo} from "../assets/images/Logo"

export default function Shell(props) {
	const theme = useMantineTheme();
	const [opened, setOpened] = useState(false);
	return (
		<AppShell
			id="Shell"
			styles={{
				main: {
					background:
						theme.colorScheme === "dark"
							? theme.colors.bgDark[0]
							: theme.colors.gray[0],
				},
			}}
			navbarOffsetBreakpoint="sm"
			asideOffsetBreakpoint="sm"
			fixed
			navbar={
				<Navbar
					p="md"
					hiddenBreakpoint="sm"
					hidden={!opened}
					width={{ sm: 300 }}
				>
					<NavbarContent />
				</Navbar>
			}
			aside={
				<MediaQuery smallerThan="lg" styles={{ display: "none" }}>
					<Aside p="md" hiddenBreakpoint="lg" width={{ lg: 300 }}>
						<Info />
					</Aside>
				</MediaQuery>
			}
			header={
				<Header height={70} p="md">
					<div className="flex justify-between items-center">
						<div
							style={{
								display: "flex",
								alignItems: "center",
								height: "100%",
							}}
						>
							<MediaQuery
								largerThan="sm"
								styles={{ display: "none" }}
							>
								<Burger
									opened={opened}
									onClick={() => setOpened((o) => !o)}
									size="sm"
									color={theme.colors.gray[6]}
									mr="xl"
								/>
							</MediaQuery>

							<Link href="/" passHref>
								<Text id="pageName">Sentinel</Text>
							</Link>
						</div>
						<Logo className="h-10"/>
						
					</div>
				</Header>
			}
		>
			<ScrollArea id="pageScrollArea">
				<div className={props.className}>{props.children}</div>
			</ScrollArea>
		</AppShell>
	);
}
