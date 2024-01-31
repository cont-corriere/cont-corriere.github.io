import React from "react";

import { NavBar } from "../Miscellaneous/NavBar";
import { Footer } from "../Miscellaneous/Footer";
import CurrentOrders from "./CurrentOrders";
import ShoppingCart from "./ShoppingCart";

export default function Cart() {
	return (
		<>
			<NavBar />
			<section class="flex flex-col bg-gray-50 dark:bg-gray-900 min-h-screen px-8 py-2">
				<h1 class="text-center items-center text-black dark:text-white font-bold text-5xl p-5">
					Cart
				</h1>
				<div class="flex flex-col items-center py-2 space-y-10">
					<CurrentOrders />
					<ShoppingCart />
				</div>
			</section>

			<Footer />
		</>
	);
}
