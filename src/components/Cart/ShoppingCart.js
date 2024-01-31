import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getLocalStorageProfile, getCart, getCartArray } from "../../utils/Utils";

const ShoppingCart = () => {
	const [cart, setCart] = useState(null);

	useEffect(() => {
		fetchCart();
	}, []);

	// TODO - make username "Guest" / userId not possible to be signed up
	const fetchCart = async () => {
		let userId = await getLocalStorageProfile("userId");
		let fetchedCart = await getCartArray(userId);
		if(fetchedCart !== null){
			setCart(fetchedCart);
		}
	}

	return (
		<div className="w-3/4">
			<h1 className="text-left items-center text-black dark:text-white font-bold text-3xl p-5">
				Shopping Cart
			</h1>
			{cart !== null && Array.isArray(cart) && cart.length > 0 ? (
				cart.map((restaurant, restaurantIndex) => (

					<div key={restaurantIndex} className="dark:bg-gray-900 border-2 rounded-3xl justify-center px-5 mb-20">
						<h2 className="text-center items-center text-black dark:text-white font-bold text-3xl p-5">
							{restaurant.name}
						</h2>
						{restaurant.items.map((order, orderIndex) => (
							<div key={orderIndex} className="py-7">
								<div className="flex flex-col md:flex-row dark:bg-gray-900 border-2 rounded-3xl justify-center space-x-16">
									<div className="flex justify-center py-4">
										<img
											src={order.image}
											alt="Food"
											className="md:w-48 w-32 object-cover rounded-3xl"
										></img>
									</div>
									<div className="md:space-y-1 space-y-4 py-4 md:py-12">
										<p className="text-left font-bold text-black dark:text-white text-xl py-2">
											{order.name}
										</p>
										{/* <div className="flex flex-col md:flex-row md:space-y-1">
											<p className="font-bold text-left text-black dark:text-white text-xl md:w-36">
												Restaurant:
											</p>
											<p className="text-left text-black dark:text-white text-xl">
												{item.restaurant}
											</p>
										</div> */}
										{/* TODO - quantity implementation later... */}
										<div className="flex flex-col md:flex-row md:space-y-1">
											<p className="font-bold text-left text-black dark:text-white text-xl md:w-36">
												Quantity:
											</p>
											<p className="text-left text-black dark:text-white text-xl ">
												1
											</p>
										</div>
										
										<div className="flex flex-col md:flex-row md:space-y-1">
											<p className="font-bold text-left text-black dark:text-white text-xl md:w-36">
												Price:
											</p>
											<p className="text-left text-black dark:text-white text-xl ">
												{order.price}
											</p>
										</div>

										{/* <div className="flex flex-col md:flex-row space-y-1">
											<p className="font-bold text-left text-black dark:text-white text-xl md:w-36">
												Total Price:
											</p>
											<p className="text-left text-black dark:text-white text-xl">
												{item.price * item.quantity}
											</p>
										</div> */}
									</div>
									{/* TODO - button for deleting the food and implementation */}
								</div>
							</div>
							
						))}
						
						<div class="text-center text-lg py-2">
							<Link to= {"/generatedCode"} state={{restaurantName: `${restaurant.name}`, isOrdering: true}} >
								<button class="bg-light-orange hover:bg-dark-orange rounded-xl px-5 py-2 mb-3">
									<p class="font-bold">Check Out</p>
								</button>
							</Link>
						</div>
										
					</div>
				// )
				))
			) : (
				<div className="dark:bg-gray-900 border-2 rounded-3xl items-center mb-10">
					<p className="text-center text-black dark:text-white text-xl p-5">
						Shopping cart is empty.
					</p>
				</div>
			)}
		</div>
	);
};

export default ShoppingCart;
