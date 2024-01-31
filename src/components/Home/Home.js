import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LandingPage from "./LandingPage";
import Dashboard from "../Dashboard/Dashboard";

function getToken() {
	const tokenString = sessionStorage.getItem("token");
	const userToken = JSON.parse(tokenString);
	return userToken?.token;
}

const Home = () => {
	const [token, setToken] = useState();

	useEffect(() => {
		setToken(getToken());
	});

	if (!token) {
		return (
			<div className="flex flex-col justify-center">
				<section class="bg-gray-50 dark:bg-gray-900">
					<div class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
						<div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
							<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
								<h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
									Please login to your account{" "}
									<Link to={"/login"}>
										<span className="text-yellow-300 hover:text-yellow-500">
											here.
										</span>
									</Link>
								</h1>
							</div>
						</div>
					</div>
				</section>
			</div>
		);
	}

	return <Dashboard />;
};

export default Home;
