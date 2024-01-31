import BetterCarousel from "better-react-carousel";
import { Link } from "react-router-dom";

export function Categories() {
	return (
		<>
			<p class="text-3xl font-bold px-8 py-4">
				Categories
				<br></br>
			</p>

			<div class="items-center text-center p-10 justify-center">
				<BetterCarousel cols={6} rows={1} gap={5} loop={true}>
					<BetterCarousel.Item>
						<div class="mb-0">
							<button class="bg-light-orange hover:bg-dark-orange text-xl text-black   font-lato-bold py-2 px-10 rounded-3xl focus:outline-none">
								Italian
							</button>
						</div>
					</BetterCarousel.Item>
					<BetterCarousel.Item>
						<div class="mb-0">
							<button class="bg-light-orange hover:bg-dark-orange text-xl text-black   font-lato-bold py-2 px-10 rounded-3xl focus:outline-none">
								Japanese
							</button>
						</div>
					</BetterCarousel.Item>
					<BetterCarousel.Item>
						<div class="mb-0">
							<button class="bg-light-orange hover:bg-dark-orange text-xl text-black   font-lato-bold py-2 px-10 rounded-3xl focus:outline-none">
								Healthy
							</button>
						</div>
					</BetterCarousel.Item>
					<BetterCarousel.Item>
						<div class="mb-0">
							<button class="bg-light-orange hover:bg-dark-orange text-xl text-black   font-lato-bold py-2 px-10 rounded-3xl focus:outline-none">
								Indian
							</button>
						</div>
					</BetterCarousel.Item>
					<BetterCarousel.Item>
						<div class="mb-0">
							<button class="bg-light-orange hover:bg-dark-orange text-xl text-black   font-lato-bold py-2 px-10 rounded-3xl focus:outline-none">
								Chinese
							</button>
						</div>
					</BetterCarousel.Item>
					<BetterCarousel.Item>
						<div class="mb-0">
							<button class="  bg-light-orange hover:bg-dark-orange text-xl text-black   font-lato-bold py-2 px-10 rounded-3xl focus:outline-none">
								Western
							</button>
						</div>
					</BetterCarousel.Item>
					<BetterCarousel.Item>
						<div class="mb-0">
							<button class="  bg-light-orange hover:bg-dark-orange text-xl text-black   font-lato-bold py-2 px-10 rounded-3xl focus:outline-none">
								Korean
							</button>
						</div>
					</BetterCarousel.Item>
                    <BetterCarousel.Item>
						<div class="mb-0">
							<button class="  bg-light-orange hover:bg-dark-orange text-xl text-black   font-lato-bold py-2 px-10 rounded-3xl focus:outline-none">
								Indonesian
							</button>
						</div>
					</BetterCarousel.Item>
                    <BetterCarousel.Item>
						<div class="mb-0">
							<button class="  bg-light-orange hover:bg-dark-orange text-xl text-black   font-lato-bold py-2 px-10 rounded-3xl focus:outline-none">
								French
							</button>
						</div>
					</BetterCarousel.Item>
                    <BetterCarousel.Item>
						<div class="mb-0">
							<button class="  bg-light-orange hover:bg-dark-orange text-xl text-black   font-lato-bold py-2 px-10 rounded-3xl focus:outline-none">
								Snacks
							</button>
						</div>
					</BetterCarousel.Item>
					<BetterCarousel.Item>
						<div class="mb-0">
							<button class="  bg-light-orange hover:bg-dark-orange text-xl text-black   font-lato-bold py-2 px-10 rounded-3xl focus:outline-none">
								Desserts
							</button>
						</div>
					</BetterCarousel.Item>
					<BetterCarousel.Item>
						<div class="mb-0">
							<button class="  bg-light-orange hover:bg-dark-orange text-xl text-black   font-lato-bold py-2 px-10 rounded-3xl focus:outline-none">
								Drinks
							</button>
						</div>
					</BetterCarousel.Item>
                    
				</BetterCarousel>
			</div>

			<br></br>
		</>
	);
}