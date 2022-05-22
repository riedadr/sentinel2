import React from "react";
import { useInfo } from "../contexts/info";

export default function Info() {
	const { ipAddr, ipLoc, gps } = useInfo();
	return (
		<div className="grid gap-4">
			<div id="ip">
				<h3>IP</h3>
				<p>
					<span className="text-theme font-bold">{ipAddr}</span>
				</p>
				<p>
					<code>Location:</code> {ipLoc.city} ({ipLoc.region}), {ipLoc.country}
				</p>
				<p>
					<code>Timezone:</code> {ipLoc.timezone}
				</p>
			</div>

			{gps && (
				<div>
					<h3>GPS</h3>
					<p>
						{gps.coords.latitude}°N {gps.coords.longitude}°E
					</p>
				</div>
			)}
		</div>
	);
}
