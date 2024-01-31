import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, json, useNavigate } from "react-router-dom";
import { getUserDetails, getAllUsersJson, setLocalStorageProfile, getUserType } from "../../utils/Utils";


export default function Login({ setToken }) {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [errorMessage, setErrorMessage] = useState();

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = await getAllUsersJson();

		try{
			const userProfile = await getUserDetails(data, email);
			const userType = await getUserType(data, userProfile.userId);

			console.log(userProfile.username);
			console.log(userType);

			if(password === userProfile.password){
				alert(`User ${userProfile.username} logged in!`) //TODO - set to username later

				// store userProfile in local storage
				setLocalStorageProfile(userProfile);

				if(userType === "admins") navigate("/admin");
				else if(userType === "merchants") navigate("/merchant");
				else if(userType === "customers") navigate("/dashboard");
				else navigate("/dashboard");
			}
			else{
				setErrorMessage("Incorrect password.");
			}
			// setToken(token);

		}
		catch(error){
			setErrorMessage("Email not found.");
			alert(`Login for email ${JSON.stringify(email)} not found!`);
			console.log(error);
		}
		
	};

	return (
		<div className="flex flex-col justify-center">
			<section class="bg-gray-50 dark:bg-gray-900">
				<div class="flex flex-col items-center justify-center px-6 py-8 h-screen lg:py-0">
					<a
						href="#"
						class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
					>
						<Link to={"/"}>
							<img
								class="w-48 h-27"
								src="https://1000logos.net/wp-content/uploads/2022/11/Continental-Logo-Emblem.png"
								alt="logo"
							/>
						</Link>
					</a>
					<div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
						<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
							<h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
								Sign in to your account
							</h1>
							<form action="#">
								<div class="space-y-4">
									<label
										for="email"
										class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Your email
									</label>
									<input
										type="email"
										name="email"
										id="email"
										class=" bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
										// placeholder="name@company.com"
										required=""
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>
								<div class="my-5 space-y-4">
									<label
										for="password"
										class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Password
									</label>
									<input
										type="password"
										name="password"
										id="password"
										// placeholder="••••••••"
										class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										required=""
										onChange={(e) => setPassword(e.target.value)}
									/>
								</div>
								<div class="flex items-center justify-between">
									<div class="flex items-start">
										<div class="flex items-center h-5">
											<input
												id="remember"
												aria-describedby="remember"
												type="checkbox"
												class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
												required=""
											/>
										</div>
										<div class="ml-3 text-sm">
											<label
												for="remember"
												class="text-gray-500 dark:text-gray-300"
											>
												Remember me
											</label>
										</div>
									</div>
									<a
										href="#"
										class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 text-gray-900 dark:text-white"
									>
										Forgot password?
									</a>
								</div>
								<button
									onClick={handleSubmit}
									type="submit"
									class="w-full text-gray-900 dark:text-white bg-primary-600 border-2 hover:bg-light-orange hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-4"
								>
									Sign in
								</button>
								<p className="text-sm font-light text-red-500 text-center mt-1 mb-4">
									{errorMessage}
								</p>
								<p class="text-sm font-light text-gray-500 dark:text-gray-400">
									Don’t have an account yet?{" "}
									<Link to={"/signup"}>
										<a
											href="#"
											class="font-medium text-primary-600 hover:underline dark:text-primary-500"
										>
											Sign up
										</a>
									</Link>
								</p>
							</form>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

Login.propTypes = {
	setToken: PropTypes.func.isRequired,
};
