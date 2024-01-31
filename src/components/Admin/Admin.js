import { Footer } from "../Miscellaneous/Footer";
import AdminHeader from "./AdminHeader";
import AdminWelcome from "./AdminWelcome";
import RobotTrackerMenu from "./RobotTrackerMenu";
import RobotStatus from "./RobotTrackerMenu";

const Admin = () => {
	return (
		<>
			<AdminHeader />
			<section class="bg-gray-50 dark:bg-gray-900 h-full justify-center dark:text-white">
				<AdminWelcome />
				<RobotTrackerMenu />
			</section>

			<Footer />
		</>
	);
};

export default Admin;
