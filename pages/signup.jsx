import React, { useRef } from "react";
import Link from "next/link";
import { Logo } from "../assets/images/Logo";
import styles from "../styles/Login.module.css";
import { Button, Text } from "@mantine/core";
import Router from "next/router";

export default function login() {
	return (
		<div className={styles.Login}>
			<nav>
				<Link href="/" passHref>
					<Text id="pageName">Sentinel</Text>
				</Link>
				<Logo className="h-10" />
			</nav>
			<main>
				<div className={styles.Prompt}>
					<h1>Register</h1>
					<Form />
				</div>
			</main>
		</div>
	);
}

function Form() {
	const userRef = useRef();
	const pwRef = useRef();
	const [message, setMessage] = React.useState(null)

    async function submit(e) {
		e.preventDefault();
		let user = userRef.current.value;
		let pw = pwRef.current.value;

		console.log(user, pw);

		//return Router.push("/")
	}

	return (
		<form className="grid">
			<label htmlFor="user">Username</label>
			<input name="user" type="text" ref={userRef} />
			<label htmlFor="pw">Password</label>
			<input name="pw" type="password" ref={pwRef} />
			<br />
			{message && <p className="text-red-500">{message}</p>}
			<Button type="submit" className="bg-theme" color="orange" onClick={submit}>
				anmelden
			</Button>
		</form>
	);
}
