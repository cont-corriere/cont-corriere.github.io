import { Link } from "react-router-dom";
import { Footer } from "../Miscellaneous/Footer";
import { NavBar } from "../Miscellaneous/NavBar";
import SettingsFields from "./SettingsFields";

const Settings = () => {
	return (
		<>
			<NavBar />
			<div className="">
				<section class="flex flex-col text-black dark:text-white bg-gray-50 dark:bg-gray-900 justify-center p-4 text-center ">
					{/* Only display this section if robot is available */}

					{/* TODO - Insert green tick icon here */}
					{/* <p class="text-center items-center text-black dark:text-white text-3xl p-5">
						This is a Settings Page.
					</p> */}

					<SettingsFields />
					<Link to={"/dashboard"}>
						<p className="mt-4 mb-8 text-sm text-center text-black hover:text-blue-500 hover:underline dark:text-white">
							Return to home
						</p>
					</Link>
				</section>
			</div>

			<Footer />
		</>
	);
};

export default Settings;
