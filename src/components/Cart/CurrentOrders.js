import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getLocalStorageProfile, getOrders, getOrdersArray } from "../../utils/Utils";


const CurrentOrders = () => {
	const [orders, setOrders] = useState(null);

	useEffect(() => {
		fetchOrders();
	}, []);

	// TODO - make username "Guest" not possible to be signed up
	const fetchOrders = async () => {
		let userId = await getLocalStorageProfile("userId");
		let fetchedOrders = await getOrdersArray(userId);
		if(fetchedOrders !== null){
			setOrders(fetchedOrders);
		}
	}

	return (
		<div className="w-3/4">
			<h1 class="text-left items-center text-black dark:text-white font-bold text-3xl p-5">
				Current Orders
			</h1>
			{orders !== null ? (
				orders.map((item, index) => (
					<div key={index} className="py-7">
						<div className="flex flex-col md:flex-row dark:bg-gray-900 border-2 rounded-3xl justify-center space-x-16">
							<div className="flex justify-center py-4">
								<img
									src="icons/corriere_vector.png"
									alt="Robo"
									className="md:w-48 w-32 object-contain"
								></img>
							</div>
							<div className="md:space-y-1 space-y-4 py-4 md:py-12">
								<p className="text-left font-bold text-black dark:text-white text-xl py-2">
									Corriere is coming!
								</p>
								<div className="flex flex-col md:flex-row md:space-y-1">
									<p className="font-bold text-left text-black dark:text-white text-xl md:w-36">
										OrderID:
									</p>
									<p className="text-left text-black dark:text-white text-xl ">
										{item.orderId}
									</p>
								</div>
								<div className="flex flex-col md:flex-row md:space-y-1">
									<p className="font-bold text-left text-black dark:text-white text-xl md:w-36">
										RobotID:
									</p>
									<p className="text-left text-black dark:text-white text-xl">
										{item.robotId}
									</p>
								</div>
								<div className="flex flex-col md:flex-row md:space-y-1">
									<p className="font-bold text-left text-black dark:text-white text-xl md:w-36">
										Locker ID:
									</p>
									<p className="text-left text-black dark:text-white text-xl ">
										{item.lockerId}
									</p>
								</div>

								{/* <div className="flex flex-col md:flex-row space-y-1">
									<p className="font-bold text-left text-black dark:text-white text-xl md:w-36">
										Status:
									</p>
									<p className="text-left text-black dark:text-white text-xl">
										{item.status}
									</p>
								</div> */}

								<div className="flex flex-col md:flex-row space-y-1">
									<p className="font-bold text-left text-black dark:text-white text-xl md:w-36">
										Passcode:
									</p>
									<p className="text-left text-black dark:text-white text-xl">
										{item.passcode}
									</p>
								</div>

								<div className="flex flex-col md:flex-row space-y-1">
									<p className="font-bold text-left text-black dark:text-white text-xl md:w-36">
										Time Ordered:
									</p>
									<p className="text-left text-black dark:text-white text-xl">
										{item.timeOrdered}
									</p>
								</div>
							</div>
						</div>
					</div>
				))
			) : (
				<div className=" dark:bg-gray-900 border-2 rounded-3xl items-center">
					<p className="text-center text-black dark:text-white text-xl p-5">
						There are no current orders.
					</p>
				</div>
			)}
			
			
		</div>
	);
};

export default CurrentOrders;
