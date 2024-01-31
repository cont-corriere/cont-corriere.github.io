import RestaurantCard from "../Restaurant/RestaurantCard";

const Restaurants = () => {
	return (
		<div className="grid grid-cols-3 gap-4">
			<RestaurantCard />
			<RestaurantCard />
			<RestaurantCard />
			<RestaurantCard />
			<RestaurantCard />
			<RestaurantCard />
			<RestaurantCard />
			<RestaurantCard />
			<RestaurantCard />
		</div>
	);
};

export default Restaurants;
