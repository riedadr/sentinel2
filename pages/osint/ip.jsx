import { Button, Card, Input, Text } from "@mantine/core";
import axios from "axios";
import React, { useRef, useState } from "react";
import { Search, Terminal } from "tabler-icons-react";
import IPinfoWrapper, { IPinfo, AsnResponse } from "node-ipinfo";
import Shell from "../../components/Shell";

export default function IP() {
	const [ip, setIp] = useState();
	const ipRef = useRef(null);

	function start(e) {
		e.preventDefault();
		setIp(ipRef.current.value);
		console.log(ipRef.current.value);
	}

	return (
		<Shell>
			<h1>
				IP Tracker{" "}
				<small className="text-xs">
					by{" "}
					<a className="underline" href="https://ipinfo.io">
						ipinfo.io
					</a>
				</small>
			</h1>
			<div className="mt-4 mb-4">
				<form className="flex gap-2" onSubmit={start}>
					<Input
						className="w-full"
						icon={<Terminal />}
						placeholder="IP Address"
						ref={ipRef}
					/>
					<Button type="submit">
						<Search />
					</Button>
				</form>
			</div>
			{ip && <Result />}
		</Shell>
	);

	function Result() {
		const [result, setResult] = useState();
		const ipinfoWrapper = new IPinfoWrapper("9dd557ddd2a8ed");

		React.useEffect(() => {
			ipinfoWrapper.lookupIp(ip).then((res) => {
				console.log(res);
				setResult(res);
			});
		}, []);

		if (result) {
			return (
				<Card shadow="md" p="lg">
					<h2>
						<span className="text-green-500 font-bold">
							{result.ip}
						</span>{" "}
						<small>({result.hostname})</small>
					</h2>
					<div className="flex justify-between">
						<address>
							{result.org}
							<br />
							{result.city}
							<br />
							{result.postal} {result.region},{" "}
							{result.countryCode}
						</address>
                        <code>
                            <p>timezone: {result.timezone}</p>
                            <p><a href={"https://www.google.com/maps/place/" + result.loc} target="_blank" rel="noreferrer" >{result.loc}</a></p>
                            <p>{result.country}</p>
                        </code>
					</div>
				</Card>
			);
		}
	}
}
