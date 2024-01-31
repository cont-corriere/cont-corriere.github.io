import React from "react";

import { NavBar } from "../Miscellaneous/NavBar";
import { Footer } from "../Miscellaneous/Footer";
import {Popular} from "./Popular";
import { WelcomeText } from "./WelcomeText";
import { Categories } from "./Categories";
import { Promotion } from "./Promotion";

export default function Dashboard() {
	return (
		<>
			<NavBar />

			<section class="bg-gray-50 dark:bg-gray-900 h-full justify-center dark:text-white">
				<WelcomeText />
				{/* <SearchBar /> */}

				<Promotion />
				<Categories />
				<Popular />
			</section>

			<Footer />
		</>
	);
}