import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Login from "./components/Login/Login";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./components/Home/Home";
import Dashboard from "./components/Dashboard/Dashboard";
import Preferences from "./components/Preferences/Preferences";
import SignUp from "./components/SignUp/SignUp";
import NotFound from "./components/Miscellaneous/NotFound";
import PaymentSuccessful from "./components/Miscellaneous/PaymentSuccessful";
import Menu from "./components/Menu/Menu";
import OpenContainer from "./components/Delivery Completed/OpenContainer";
import Cart from "./components/Cart/Cart";
import Admin from "./components/Admin/Admin";
import Merchant from "./components/Merchant/Merchant";
import GeneratedCode from "./components/Generated Passcode/GeneratedCode";
import Settings from "./components/Settings/Settings";
import History from "./components/History/History";
import CartError from "./components/Generated Passcode/CartError";

function setToken(userToken) {
	sessionStorage.setItem("token", JSON.stringify(userToken));
}

function getToken() {
	const tokenString = sessionStorage.getItem("token");
	const userToken = JSON.parse(tokenString);
	return userToken?.token;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Router>
		<Routes>
			<Route exact path={"/"} element={<Home />} />
			<Route path={"/home"} element={<Home />} />
			<Route path={"/login"} element={<Login setToken={setToken} />} />
			<Route path={"/signup"} element={<SignUp />} />
			<Route path={"/cart"} element={<Cart />} />
			<Route path={"/dashboard"} element={<Dashboard />} />
			<Route path={"/paymentsuccessful"} element={<PaymentSuccessful />} />
			<Route path={"/admin"} element={<Admin />} />
			<Route path={"/merchant"} element={<Merchant />} />
			<Route path={"/settings"} element={<Settings />} />

			<Route path={"/preferences"} element={<Preferences />} />
			<Route path={"/menu"} element={<Menu />} />
			<Route path={"/openContainer"} element={<OpenContainer />} />
			<Route path={"*"} element={<NotFound />} />
			<Route path={"/history"} element={<History/>} />
			<Route path={"/cartError"} element={<CartError/>} />
			{/* <Route path={"/paymentsuccessful"} element={<PaymentSuccessful />} /> */}

			<Route path={"/generatedCode"} element={<GeneratedCode />} />
		</Routes>
	</Router>
);

// ReactDOM.render(
// 	<Router>
// 		<App />
// 	</Router>,
// 	document.getElementById("root")
// );
