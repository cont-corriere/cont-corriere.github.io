import React, { useState } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Home from "./components/Home/Home";

function setToken(userToken) {
	sessionStorage.setItem("token", JSON.stringify(userToken));
}

function getToken() {
	const tokenString = sessionStorage.getItem("token");
	const userToken = JSON.parse(tokenString);
	return userToken?.token;
}

function App() {
	// const token = getToken();
	const [token, setToken] = useState();
	if (!token) {
	}

	return (
		<div className="wrapper">
			<h1>Application</h1>
			<BrowserRouter>
				<Link>
					<Route path="/home">
						<Home />
					</Route>
					<Route path="/login"></Route>
				</Link>
			</BrowserRouter>
		</div>
	);
}

export default App;
