import Home from "../Home/Home";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, redirect } from "react";
import { Footer } from "../Miscellaneous/Footer";
import { NavBar } from "../Miscellaneous/NavBar";

const PaymentSuccessful = () => {
	const [val, setVal] = useState(false);
	const navigate = useNavigate();
	useEffect(() => {
		const timer = setTimeout(() => {
			// Set the value to true after 5 seconds
			navigate("/generatedCode");
		}, 5000);

		// Clear the timer to avoid memory leaks
		return () => clearTimeout(timer);
	}, [navigate]);
	if (!val) {
		return (
			<div className="">
				<NavBar/>
				<section class="flex flex-col text-black dark:text-white bg-gray-50 dark:bg-gray-900 h-screen justify-center  text-center ">
					<h1 className="font-bold text-6xl">Payment Successful</h1>
					<Link to={"/generatedCode"}>
						<p className="m-6 hover:text-blue-500 hover:underline">
							please click here if not redirected
						</p>
					</Link>
				</section>
				<Footer/>
			</div>
		);
	}
	// else {
	// 	return <script>{redirect("/")}</script>;
	// }
};

export default PaymentSuccessful;
