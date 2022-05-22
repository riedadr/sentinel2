import { AppProps } from "next/app";
import Head from "next/head";
import {
	ColorSchemeProvider,
	MantineProvider,
	ColorScheme,
} from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import "../styles/globals.css";
import React from "react";
import { InfoProvider } from "../contexts/info";

export default function App(props: AppProps) {
	const { Component, pageProps } = props;

	const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
		key: "colorScheme",
		defaultValue: "light",
		getInitialValueInEffect: true,
	});

	const toggleColorScheme = (value?: ColorScheme) => {
		let newScheme = value || (colorScheme === "dark" ? "light" : "dark");
		setColorScheme(newScheme);
		console.log(newScheme);

		document.querySelector("body").className = newScheme;
	};

	useHotkeys([["mod+J", () => toggleColorScheme()]]);

	return (
		<>
			<Head>
				<title>SENTINEL</title>
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width"
				/>
			</Head>

			<ColorSchemeProvider
				colorScheme={colorScheme}
				toggleColorScheme={toggleColorScheme}
			>
				<MantineProvider
					withGlobalStyles
					withNormalizeCSS
					theme={{
						colors: {
							bgDark: ["#141517"],
							fgDark: ["#18181b"],
						},
						/** Put your mantine theme override here */
						colorScheme: colorScheme,
					}}
				>
					<InfoProvider>
						<Component {...pageProps} />
					</InfoProvider>
				</MantineProvider>
			</ColorSchemeProvider>
		</>
	);
}
