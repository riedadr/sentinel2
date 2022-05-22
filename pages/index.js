import { useSession, signIn, signOut } from "next-auth/react";
import Shell from "../components/Shell";

export default function Component() {
	const { data: session } = useSession();
	if (session) {
		return (
			<>
				Signed in as {session.user.email} <br />
				<button onClick={() => signOut()}>Sign out</button>
			</>
		);
	}
	return (
		<>
			<Shell>
				Not signed in <br />
				<button onClick={() => signIn()}>Sign in</button>
			</Shell>
		</>
	);
}
