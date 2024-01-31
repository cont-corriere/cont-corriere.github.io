export function SearchBar() {
	return (
		<>
			<div class="text-center items-center p-4 text-xl">
				{/* <img src="/icons/Search Black.png"></img> */}
				<input
					type="text"
					class="w-1/4 p-3 rounded-lg border bg-light-grey border-gray-300 focus:outline-none focus:border-dark-orange"
					placeholder="Search..."
				/>
			</div>
			<div class="justify-center text-center object-center">
				<button class="bg-light-orange hover:bg-dark-orange text-black rounded p-2 text-center items-center text-xl">
					Search
				</button>
			</div>
		</>
	);
}