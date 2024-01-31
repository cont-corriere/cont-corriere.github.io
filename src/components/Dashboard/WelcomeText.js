import { getLocalStorageProfile } from "../../utils/Utils";
import React, { useEffect, useState } from 'react';


export function WelcomeText() {
	const [username, setUsername] = useState('Guest');

	useEffect(() => {
		const fetchData = async () => {
			let localStorageUsername = await getLocalStorageProfile("username");
			if (localStorageUsername !== "") {
				setUsername(localStorageUsername);
			}
		};
		fetchData();
	}, []);

	
	return (
		<>
			<br></br>
			<div class="flex">
				<p class="text-3xl p-4 mx-auto text-center justify-between">
					Hey <span class="font-bold">{username}</span>, <br />
					What would you like to eat?
				</p>
			</div>
		</>
	);
}