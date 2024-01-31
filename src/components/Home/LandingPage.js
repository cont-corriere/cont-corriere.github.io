import { Link } from "react-router-dom";
import TopMenu from "./TopMenu";
import Banner from "./Banner";
import Restaurants from "./Restaurants";

const LandingPage = () => {
	return (
		<div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
			<div className="flex flex-col justify-center mx-32">
				<TopMenu />
				<Banner />
				<h1 className="text-white font-bold text-3xl my-5">Restaurants</h1>
				<Restaurants />
				<h1 className="m-24"></h1>
			</div>
		</div>
	);
};

export default LandingPage;
