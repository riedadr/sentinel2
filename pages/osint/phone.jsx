import { ActionIcon, Button, Card, Input, Loader } from "@mantine/core";
import axios from "axios";
import React, { useRef } from "react";
import { PhoneCall, PhoneOutgoing, Search } from "tabler-icons-react";
import Shell from "../../components/Shell";

export default function Phone() {
	const phoneRef = useRef();
	const [phone, setPhone] = React.useState();
	const [localNr, setLocalNr] = React.useState();
	function start(e) {
		e.preventDefault();
		setPhone(phoneRef.current.value);
	}

	return (
		<Shell>
			<h1>Phone Number Search</h1>
			<div className="mt-4 mb-4">
				<form className="flex gap-2" onSubmit={start}>
					<Input
						className="w-full"
						icon={<PhoneCall />}
						placeholder="+00 000 0000000"
						ref={phoneRef}
					/>
					<Button type="submit">
						<Search />
					</Button>
				</form>
			</div>
			{phone && <Result />}
		</Shell>
	);

	function Result() {
		return (
			<div className="flex flex-col gap-4">
                <Verifone />
				<Sites />
			</div>
		);
	}

	function Verifone() {
		const [data, setData] = React.useState();

		React.useEffect(() => {
			const options = {
				method: "GET",
				url: "https://veriphone.p.rapidapi.com/verify",
				params: { phone: phone },
				headers: {
					"X-RapidAPI-Host": "veriphone.p.rapidapi.com",
					"X-RapidAPI-Key":
						"9cfe91c0aemsh85402594fda58fdp1eb483jsnb8a2def2a7c4",
				},
			};

			axios
				.request(options)
				.then(function (response) {
					console.log(response.data);
					setData(response.data);
					setLocalNr(response.data.local_number.replace(/\s/g, ""));
				})
				.catch(function (error) {
					console.error(error);
				});
		}, []);

		if (data) {
			return (
				<Card shadow="md" p="lg">
					<div className="flex justify-between">
						<h2
							className={
								data.phone_valid
									? "text-green-500"
									: "text-red-500"
							}
						>
							{phone}
						</h2>
						<ActionIcon
							component="a"
							href={"tel:" + (data.phone_valid ? data.international_number : phone)}
						>
							<PhoneOutgoing />
						</ActionIcon>
					</div>

					<code>
						<p>
							{data.international_number} | {data.country_code}:{" "}
							{data.local_number}
						</p>
						<p>Provider: {data.carrier}</p>
						<p>
							Land: {data.country} ({data.country_prefix})
						</p>
						<p>Region: {data.phone_region}</p>
						<p>Art: {data.phone_type}</p>
					</code>
				</Card>
			);
		}

		return (
			<Card shadow="md" p="lg">
				<h2 className="text-yellow-500">{phone}</h2>
				<div className="flex justify-center">
					<Loader />
				</div>
			</Card>
		);
	}

	function Sites() {
		return (
			<Card shadow="md" p="lg">
				<h2>Weitere Informationen</h2>
				<div className="flex gap-2 flex-wrap mt-2">
					<Button
						component="a"
						href={
							"https://www.werruft.info/telefonnummer/" + (localNr ? localNr : phone)
						}
						target="_blank"
						rel="noreferrer"
					>
						WERRUFT
					</Button>
					<Button
						component="a"
						href={"https://www.tellows.de/num/" + phone}
						target="_blank"
						rel="noreferrer"
					>
						Tellows
					</Button>
				</div>
			</Card>
		);
	}
}
