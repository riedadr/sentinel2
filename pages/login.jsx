import React, { useRef } from "react";
import Link from "next/link";

import { Logo } from "../assets/images/Logo";
import styles from "../styles/Login.module.css";
import { Button, Text } from "@mantine/core";

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
					<h1>Login</h1>
					<Form />
				</div>
			</main>
		</div>
	);
}

function Form() {
	const userRef = useRef();
	const pwRef = useRef();

    function submit() {
        let user = userRef.current.value;
        let pw = pwRef.current.value;

        console.log(user,pw);
    }

	return (
		<form className="grid">
			<label htmlFor="user">Username</label>
			<input name="user" type="text" ref={userRef} />
			<label htmlFor="pw">Password</label>
			<input name="pw" type="password" ref={pwRef} />
			<br />
			<Button className="bg-theme" color="orange" onClick={submit}>
				anmelden
			</Button>
		</form>
	);
}
