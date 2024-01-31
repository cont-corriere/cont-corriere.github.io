import BetterCarousel from "better-react-carousel";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllRestaurantsJson } from "../../utils/Utils";

export function Popular() {
	const [restaurantList, setRestaurantList] = useState(null);

	useEffect(() => {
		getAllRestaurants();
	}, []);

	const getAllRestaurants = async () => {
		let restaurantJson = await getAllRestaurantsJson();
		setRestaurantList(restaurantJson);
	}


	return (
		<>
			{restaurantList != null && (
				<div>
					<p className="text-3xl font-bold px-8">Popular</p>
					<div className="items-center text-center p-4 justify-center">
					
						<BetterCarousel cols={4} rows={1} gap={30} loop={true}>

							{restaurantList.map((item, index) => (
								item.isOpen && (
									<BetterCarousel.Item key={index}>
										<Link to= {"/menu"} state={{name: `${item.name}`}} >
											<div className="bg-white text-black rounded-2xl overflow-hidden border-gray-200 border-4 mb-8">
											<img
												className="w-full h-64 object-cover"
												src={item.image}
												alt="pasta"
											/>
											<div className="px-6 py-4">
												<p className="font-bold text-2xl mb-2">{item.name}</p>
												<div className="text-right">
												<img
													src="/icons/Star.png"
													className="inline w-6 mb-1.5 mr-0.5"
													alt="star"
												/>
												<p className="text-black text-right inline font-lato-bold text-base">
													{item.rating}/5.0
												</p>
												</div>

												<p className="text-gray-700 text-left text-base">
												{item.deliveryTime} minutes delivery
												</p>
												<p className="text-gray-500 text-left text-base">{item.category}</p>
												<div className="text-left">
												<p className="text-black text-base inline">S$ {item.deliveryFee}</p>{" "}
												<p className="text-gray-500 inline">Delivery fee</p>
												</div>
												{/* <div className="text-right">
												<button className="bg-light-orange hover:bg-dark-orange rounded p-2">
													<img src="/icons/Shopping Basket.png" className="w-6" />
												</button>
												</div> */}
											</div>
											</div>
										</Link>
									</BetterCarousel.Item>
								)
							))}

						</BetterCarousel>
					</div>
				</div>
			)}
		</>
	);
}
