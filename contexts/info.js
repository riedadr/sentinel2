import React, { createContext, useContext, useState } from "react";

const InfoContext = createContext();

export function useInfo() {
	return useContext(InfoContext);
}

export function InfoProvider({ children }) {
	const [ipAddr, setIpAddr] = useState("unknown");
	const [ipLoc, setIpLoc] = useState("unknown");
	const [gps, setGps] = useState();
	const [theme, setTheme] = useState("dark")
	
	function getIP() {
		fetch("/api/ip")
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setIpAddr(data.ip);
				setIpLoc(data.location);
			})
			.catch((err) => console.log(err));
	}

	

	function getGPS() {
		navigator.geolocation.getCurrentPosition((data) => {
			console.log(data);
			setGps(data);
		});
	}

	const value = {
		ipAddr,
		ipLoc,
		gps,
		theme,
	};

	React.useEffect(() => {
		getIP();
		getGPS();

		setTheme(localStorage.colorScheme);
		document.querySelector("body").className = localStorage.colorScheme.replace('"', '').replace('"', '');
	}, []);

	return (
		<div>
			<InfoContext.Provider value={value}>
				{children}
			</InfoContext.Provider>
		</div>
	);
}
