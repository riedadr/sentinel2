import React, { createContext, useContext, useState } from "react";

const InfoContext = createContext();

export function useInfo() {
	return useContext(InfoContext);
}

export function InfoProvider({ children }) {
	const [user, setUser] = useState({
		user: "Karsten",
		role: "cit116",
		group: "sentinel",
		image: "https://github.com/riedadr.png",
	});
	const [ipAddr, setIpAddr] = useState("unknown");
	const [ipLoc, setIpLoc] = useState("unknown");
	const [gps, setGps] = useState();
	const [theme, setTheme] = useState("dark");

	function login(props) {
		setUser({
			user: props.user,
			person: props.person,
			group: props.group,
			image: props.image,
		});
	}

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
		user,
		ipAddr,
		ipLoc,
		gps,
		theme,
	};

	React.useEffect(() => {
		getIP();
		getGPS();

		setTheme(localStorage.colorScheme ? localStorage.colorScheme : "light");
		document.querySelector("body").className = localStorage.colorScheme ? localStorage.colorScheme
			.replace('"', "")
			.replace('"', "") : "light";
	}, []);

	return (
		<div>
			<InfoContext.Provider value={value}>
				{children}
			</InfoContext.Provider>
		</div>
	);
}
