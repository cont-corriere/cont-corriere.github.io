import BetterCarousel from "better-react-carousel";
import { Link } from "react-router-dom";

export function Promotion() {
	return (
		<>
			<p class="text-3xl font-bold px-8">
				Promotions
			</p>
			<div class="items-center text-center px-20 py-10 justify-center">
				<BetterCarousel loop={true} autoplay={2500} hideArrow={true}>
					<BetterCarousel.Item>
						<div class="shadow-2xl">
							<img
								class="w-full h-48 object-cover"
								src="/images/banner1.jpg"
								alt="promotion"
							/>
						</div>
					</BetterCarousel.Item>
					<BetterCarousel.Item>
						<div class="shadow-2xl">
							<img
								class="w-full h-48 object-cover"
								src="/images/banner2.jpg"
								alt="promotion"
							/>
						</div>
					</BetterCarousel.Item>
					<BetterCarousel.Item>
						<div class="shadow-2xl">
							<img
								class="w-full h-48 object-cover"
								src="/images/banner3.jpg"
								alt="promotion"
							/>
						</div>
					</BetterCarousel.Item>
				</BetterCarousel>
			</div>
		</>
	);
}
