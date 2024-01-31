import React from "react";

export default function NotFound() {
	return(
		<>
        <section class="flex flex-col bg-gray-50 dark:bg-gray-900 h-screen justify-center">
			<PageNotFound/>
        </section>
            

		</>
	);
}


export function PageNotFound(){
    return(
        <>
            <div class="text-center items-center font-lato-bold dark:text-white">
                <p class="text-9xl p-5 mt-5">404</p>
                <p class="text-2xl mb-7">Page Not Found</p>
            </div>
            <a href="/dashboard" class="text-black dark:text-white text-center text-m hover:underline dark:text-white">Return to Home</a>
        </>
    );
}