import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getLocalStorageProfile, getOrdersFromUserId } from "../../utils/Utils";


// const order_details = [];
// for (let i = 0; i < props.order.items.length; i++) {
// 	order_details.push(
// 		<div className="flex flex-row px-10 justify-between">
// 			<p className="text-sm">{props.order.items[i]}</p>
// 			<p className="text-sm">x{props.order.quantity[i]}</p>
// 		</div>
// 	);


// }

export default function MerchantCurrentOrderItems() {
	const [orders, setOrders] = useState(null);

	useEffect(() => {
		getOrders();
	}, []);

	const getOrders = async () => {
		let localUserId = await getLocalStorageProfile("userId");
		let ordersJson = await getOrdersFromUserId(localUserId);

		setOrders(ordersJson);
		console.log(ordersJson);
	};

	return (
		<section className="flex flex-col bg-gray-50 dark:bg-gray-900 min-h-screen">
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
				{orders !== null ? (
					orders.map((order, orderIndex) => (
						<div key={orderIndex}>
							{/* TODO: ADD username to order? */}
							<div className="border-2 rounded-md pb-4 md:h-[75vh] mb-10">
								<div class="text-left text-lg p-4 space-y-2">
									<p className="text-center text-xl">
										Order ID: {order.orderId}
									</p>

									{order.items.map((item, itemIndex) => (
										<div className="space-y-0" key={itemIndex}>
											<p>Details: </p>
											{/* TODO: ADD QUANTITY, COST */}
											<p>{item.name} x 1</p>
										</div>
									))}
								</div>
								<p className="text-center">Total: {order.total}</p>
								<div className="space-y-0 p-4">
									<p className="pt-8">Robot ID: {order.robotId}</p>
									<p className="py-0">Delivery Address: {order.address} </p>
									<p className="py-0">Time Ordered: {order.timeOrdered} </p>
								</div>
							</div>
						</div>
					))
				) : (
					<div className="dark:bg-gray-900 border-2 rounded-3xl items-center">
						<p className="text-center text-black dark:text-white text-xl p-5">
							There are no orders yet.
						</p>
					</div>
				)}
			</div>
		</section>
	);
}
