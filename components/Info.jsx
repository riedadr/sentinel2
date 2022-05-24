import { Button } from "@mantine/core";
import React from "react";
import { Map2 } from "tabler-icons-react";
import { useInfo } from "../contexts/info";

export default function Info() {
	const { ipAddr, ipLoc, gps } = useInfo();
	return (
		<div className="grid gap-4">
			<div id="ip">
				<h3>IP</h3>
				<p>
					{ipAddr && (
						<span className="text-theme font-bold">{ipAddr}</span>
					)}
				</p>
				{ipLoc && (
					<>
						<p>
							<code>Location:</code> {ipLoc.city} ({ipLoc.region}
							), {ipLoc.country}
						</p>
						<p>
							<code>Timezone:</code> {ipLoc.timezone}
						</p>
					</>
				)}
			</div>

			{gps && (
				<div>
					<h3>GPS</h3>
					<p>
						{gps.coords.latitude}°N {gps.coords.longitude}°E
					</p>
					<Button
						className="mt-2"
						variant="outline"
						component="a"
						href={
							"https://www.google.com/maps/place/" +
							gps.coords.latitude +
							"N+" +
							gps.coords.longitude +
							"E"
						}
						target="_blank"
						rel="noreferrer"
						leftIcon={<Map2 />}
					>
						Gmaps
					</Button>
				</div>
			)}
		</div>
	);
}
