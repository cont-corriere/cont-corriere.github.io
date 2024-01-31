const Banner = () => {
	return (
		<div className="flex h-64">
			<div className=" flex w-1/4"></div>
			<div className=" flex flex-row w-1/2 justify-center ">
				<div className="flex flex-col">
					<img
						class="object-fit w-64 "
						src="https://static.vecteezy.com/system/resources/previews/024/107/982/original/delicious-burger-isolated-on-transparent-background-ai-generated-png.png"
						alt=""
					/>
				</div>
				<div className=" flex flex-col ">
					<h1 className="flex font-bold text-white text-6xl mt-16">Hungry?</h1>
					<h1 className="flex font text-white text-2xl mt-4">
						Get your order now!
					</h1>
				</div>

				{/* <div class="flex flex-col justify-between p-4 leading-normal">
				<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
					Noteworthy technology acquisitions 2021
				</h5>
				<p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
					Here are the biggest enterprise technology acquisitions of 2021 so
					far, in reverse chronological order.
				</p>
			</div> */}
			</div>
		</div>
	);
};

export default Banner;
