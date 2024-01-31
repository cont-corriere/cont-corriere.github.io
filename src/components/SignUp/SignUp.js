import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getNewUserId, getAllUsersJson, checkEmailDuplicate } from "../../utils/Utils";
import { getDatabase, set, ref, push } from "firebase/database";
import { firebaseConfig } from "../../myFirebase";
import { initializeApp } from "firebase/app";


async function signupUser(newData) {
	console.log(newData);
	
	try{
		const app = initializeApp(firebaseConfig);
		const db = getDatabase();
		const refDb = ref(db, 'users/customers/'); // TODO- find a way to register customer/admin/merchant

		const entryRefDb = push(refDb);
		set(entryRefDb, newData);
		alert("User registered!");
	}

	catch(error){
		console.log(error);
		alert("Error in pushing data to database occurred.");
	}

}

export default function SignUp() {
	const navigate = useNavigate();

	const [username, setUsername] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [confirmPassword, setConfirmPassword] = useState();

	// TODO- toggle password visibility?
	const [showPassword, setShowPassword] = useState(false);

	const [passwordsMatch, setPasswordMatch] = useState(false);
	const [passwordCheck, setPasswordCheck] = useState(false);
	const [emailCheck, setEmailCheck] = useState(false);
	const [errorCheckPassed, setErrorCheckPassed] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		errorCheck();

		// if all error checks passed, store new user in database
		if(errorCheckPassed){
			try{	
				const userJson = await getAllUsersJson();
				const newUserId = getNewUserId(userJson, "customer") // TODO- find a way to register customer/admin/merchant
				const emailTaken = checkEmailDuplicate(userJson, email); // make sure email doesn't exist already.
				
				if(!emailTaken){
					const newData = {
						"profile" : {
							"userId" : newUserId,
							"username" : username,
							"email" : email,
							"password" : password,
							"address" : "null",
							"phone" : "null",
							"cardNo" : "null"
						}
					};
					await signupUser(newData);
					navigate("/login");
				}
			}
			catch(error){
				console.log(error);
				alert("Error in processing data occurred.");
			}
		}

	};

	// Helper functions
	const checkPasswordMatch = () => {
		if (password === confirmPassword) {
			setPasswordMatch(true);
		} else {
			setPasswordMatch(false);
			setErrorMessage("Passwords do not match");
			setErrorCheckPassed(false);
		}
	};

	const checkEmailPattern = () => {
		var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		setEmailCheck(emailPattern.test(email));
		setErrorMessage("Invalid email format");
		setErrorCheckPassed(false);
	};

	const checkPassword = () => {
		if (!password) {
			setErrorMessage("Password can't be left empty");
			setErrorCheckPassed(false);
		} else if (password.length < 8) {
			setErrorMessage("Password must be at least 8 characters");
			setErrorCheckPassed(false);
		} else if (!/[A-Z]/.test(password)) {
			setErrorMessage("Password must contain at least one uppercase letter");
			setErrorCheckPassed(false);
		} else if (!/[a-z]/.test(password)) {
			setErrorMessage("Password must contain at least one lowercase letter");
			setErrorCheckPassed(false);
		} else if (!/[0-9]/.test(password)) {
			setErrorMessage("Password must contain at least one number");
			setErrorCheckPassed(false);
		} else {
			setErrorCheckPassed(true);
		}
	};

	// called when in handleSubmit (in form)
	const errorCheck = () => {
		checkEmailPattern();
		checkPassword();
		checkPasswordMatch();
	};

	return (
		<div className="flex flex-col justify-center">
			<section class="bg-gray-50 dark:bg-gray-900">
				<div class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
					<a
						href="#"
						class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
					>
						<img
							class="w-48 h-27"
							src="https://1000logos.net/wp-content/uploads/2022/11/Continental-Logo-Emblem.png"
							alt="logo"
						/>
					</a>
					<div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
						<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
							<h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
								Sign up for your account
							</h1>
							<form
								class="space-y-4 md:space-y-6"
								action="#"
								onSubmit={handleSubmit}
							>
								<div>
									<label
										for="username"
										class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Your username
									</label>
									<input
										type="text"
										name="text"
										id="text"
										class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										// placeholder="john@company.com"
										required=""
										onChange={(e) => setUsername(e.target.value)}
									/>
								</div>
								<div>
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
										class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										// placeholder="john@company.com"
										required=""
										onChange={(e) => setEmail(e.target.value.toLowerCase())}
									/>
								</div>
								<div>
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
								<div>
									<label
										for="password"
										class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Confirm Password
									</label>
									<input
										type="password"
										name="confirmPassword"
										id="confirmPassword"
										// placeholder="••••••••"
										class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										required=""
										onChange={(e) => setConfirmPassword(e.target.value)}
									/>
								</div>
								<button
									type="submit"
									class="w-full text-gray-900 dark:text-white bg-primary-600 border-2 hover:bg-light-orange hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
								>
									Sign up
								</button>

								{/* Error message */}
								{!errorCheckPassed && (
									<p class="text-sm font-light text-gray-500 dark:text-gray-400 text-right">
										{errorMessage}
									</p>
								)}

								<p class="text-sm font-light text-gray-500 dark:text-gray-400">
									Already have an account?{" "}
									<Link to={"/login"}>
										<a
											href="#"
											class="font-medium text-primary-600 hover:underline dark:text-primary-500"
										>
											Login
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
