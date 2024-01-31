import { GoChecklist } from "react-icons/go";
import { BsCart3 } from "react-icons/bs";
import { LuSettings, LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { setLocalStorageProfile } from "../../utils/Utils";

export function NavBar() {

	const navigate = useNavigate();

	const handleLogout = (e) => {
		e.preventDefault();
		setLocalStorageProfile({
			"userId" : "",
			"username" : "Guest",
			"email" : "",
			"password" : "",
			"address" : "",
			"phone" : "",
			"cardNo" : ""
		});
		navigate("/login");
	}


	return (
		<>
			<div class="flex mx-auto justify-between items-center bg-light-orange text-xl text-black p-4">
				<a href="/dashboard" class="text-black hover:underline">
					<img
						src="icons/Continental Black.png"
						alt="Continental Logo"
						class="md:w-52 w-32"
					></img>
				</a>

				<div class="flex space-x-6 md:text-xl text-sm">
					<div className="flex flex-col items-center justify-center hover:underline">
						<GoChecklist size="28" />
						<a href="/history" class="text-sm text-black ">
							History
						</a>
					</div>
					<div className="flex flex-col items-center justify-center hover:underline">
						<BsCart3 size="28" />
						<a href="/cart" class="text-sm text-black ">
							Cart
						</a>
					</div>
					<div className="flex flex-col items-center justify-center hover:underline">
						<LuSettings size="28" />
						<a href="/settings" class="text-sm text-black ">
							Settings
						</a>
					</div>
					<div className="flex flex-col items-center justify-center hover:underline">
						<LuLogOut size="28" />
						<a href="/login" class="text-sm text-black" onClick={handleLogout}>
							Log Out
						</a>
					</div>
				</div>
			</div>
		</>
	);
}
