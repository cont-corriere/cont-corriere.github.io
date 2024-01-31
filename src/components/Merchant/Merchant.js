import { Footer } from "../Miscellaneous/Footer";
import MerchantCurrentOrders from "./MerchantCurrentOrders";
import MerchantCurrentOrderItems from "./MerchantCurrentOrderItems";
import { MerchantMenu } from "./MerchantMenu";
import MerchantWelcome from "./MerchantWelcome";

const Merchant = () => {
	return (
		<>
			<MerchantMenu />
			<section class="bg-gray-50 dark:bg-gray-900 h-full justify-center dark:text-white">
				<MerchantWelcome />
				<MerchantCurrentOrderItems />
			</section>
			<Footer />
		</>
	);
};

export default Merchant;
