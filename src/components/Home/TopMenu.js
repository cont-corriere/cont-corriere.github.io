import { Link } from "react-router-dom";

const TopMenu = () => {
	return (
		<div className="flex text-white justify-between m-8 text-center">
			<div className="flex">
				<Link to={"/"}>
					<img
						class="w-32 h-18 "
						src="https://1000logos.net/wp-content/uploads/2022/11/Continental-Logo-Emblem.png"
						alt="logo"
					/>
				</Link>
			</div>
			<div className="flex flex-row space-x-10">
				<div>
					<h1>Profile</h1>
				</div>
				<div className="flex">
					<h1>Order History</h1>
				</div>

				<div>
					<h1>Settings</h1>
				</div>
			</div>
		</div>
	);
};

export default TopMenu;
