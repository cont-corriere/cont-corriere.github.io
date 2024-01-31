import React, { useEffect, useState } from "react";
import { MdOutlineEditOff } from "react-icons/md";
import {
	getLocalStorageProfile,
	getAllUsersJson,
	getUserDetails,
	getUserType,
	updateSettings
} from "../../utils/Utils";

import { Link } from "react-router-dom";

const SettingsFields = () => {
	const [username, setUsername] = useState("Guest");
	const [email, setEmail] = useState("");
	const [mobile, setMobile] = useState("");
	const [cardNo, setCardNo] = useState("");
	const [address, setAddress] = useState("");
	const [errorMessage, setErrorMessage] = useState();

	const updateHandler = async (e) => {
		e.preventDefault();
		const data = await getAllUsersJson();

		const validUserTypes = ["customers", "admins", "merchants"];

		const userProfile = await getUserDetails(data, email);
		const userType = await getUserType(data, userProfile.userId);
		const userId = userProfile.userId;

		if (!userType in validUserTypes) {
			console.error(
				"There is something wrong with the db reference to update the user profile"
			);
		} else {
			updateSettings(userType, userId, mobile, cardNo, address);
			alert("Profile updated!");
			try {
				console.log(userId);
			} catch {
				console.error("User profile not updated!");
			}
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			let localStorageUsername = await getLocalStorageProfile("username");
			let localStorageEmail = await getLocalStorageProfile("email");

			if (localStorageUsername !== "") {
				setUsername(localStorageUsername);
			}
			if (localStorageEmail !== "") {
				setEmail(localStorageEmail);
			}

			if (localStorageEmail != "Guest") {
				const data = await getAllUsersJson();
				const userProfile = await getUserDetails(data, localStorageEmail);
				const userType = await getUserType(data, userProfile.userId);
				setMobile(userProfile.phone);
				setCardNo(userProfile.cardNo);
				setAddress(userProfile.address);
			}
		};
		fetchData();
	}, []);
	if (username === "Guest") {
		return (
			<div className="min-h-screen">
				<p className="text-2xl pt-24">Please login to access this page.</p>
				<Link to={"/login"}>
					<p className="mt-4 mb-8 text-sm text-center text-black hover:text-blue-500 hover:underline dark:text-white">
						Go to Login Page
					</p>
				</Link>
			</div>
		);
	}
	return (
		<div className="">
			<form class=" w-full max-w-3xl mx-auto  h-fit ">
				<p className="text-center md:text-start px-24 py-8 text-3xl font-bold ">
					Account Settings
				</p>
				<div className="flex space-x-20 justify-center ">
					<div className=" w-1/2 md:w-2/5">
						<div class="">
							<label
								for="email"
								class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-start"
							>
								Username
							</label>
							<div className="flex flex-row space-x-2 items-center">
								<input
									class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder={username}
									disabled
									readonly
								/>
								<MdOutlineEditOff size={30} />
							</div>
							<p className="text-right text-xs text-red-500">
								This cannot be edited.
							</p>
						</div>
						<div class="">
							<label
								for="email"
								class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-start"
							>
								Username
							</label>
							<div className="flex flex-row space-x-2 items-center">
								<input
									class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder={email}
									disabled
									readonly
								/>
								<MdOutlineEditOff size={30} />
							</div>
							<p className="text-right text-xs text-red-500">
								This cannot be edited.
							</p>
						</div>

						<div class="my-5">
							<label
								for="email"
								class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-start"
							>
								Mobile Number
							</label>
							<input
								type="text"
								id="phone"
								class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								value={mobile}
								onChange={(e) => setMobile(e.target.value)}
							/>
						</div>
						<div class="mb-5">
							<label
								for="email"
								class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-start"
							>
								Card Number
							</label>
							<input
								type="email"
								id="email"
								class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								value={cardNo}
								onChange={(e) => setCardNo(e.target.value)}
							/>
						</div>
						<div class="mb-5">
							<label
								for="large-input"
								class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-start"
							>
								Address
							</label>
							<input
								type="text"
								id="large-input"
								class=" block w-full text-sm p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								value={address}
								onChange={(e) => setAddress(e.target.value)}
							/>
						</div>
						<button
							type="submit"
							class="w-full text-gray-900 dark:text-white bg-primary-600 border-2 hover:bg-light-orange hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-4"
							onClick={updateHandler}
						>
							Save Changes
						</button>
						<button
							type="submit"
							class="w-full text-gray-900 dark:text-white bg-primary-600 border-2 hover:bg-light-orange hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-4"
						>
							Change Password
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default SettingsFields;
