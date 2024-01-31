import MerchantCurrentOrderItems from "./MerchantCurrentOrderItems";
import data from "./orders.json";

// note: file not used

const MerchantCurrentOrders = () => {
	const order_items = [];
	for (let i = 0; i < data["orders"].length; i++) {
		order_items.push(
			<MerchantCurrentOrderItems key={i} order={data["orders"][i]} />
		);
	}
	return (
		<>
			<div className="px-8">
				<br></br>
				<p class="text-3xl font-bold ">Current Orders</p>
				<div class="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
					{order_items}
				</div>
			</div>
		</>
	);
};

export default MerchantCurrentOrders;
