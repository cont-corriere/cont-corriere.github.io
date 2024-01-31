import React from "react";

import { NavBar } from "../Miscellaneous/NavBar";
import { Footer } from "../Miscellaneous/Footer";

export default function OpenContainer(){
    return(
        <>
            <NavBar/>

                <section class="flex flex-col bg-gray-50 dark:bg-gray-900 h-screen justify-center px-8 py-2">
                    <p class="text-center items-center text-black dark:text-white text-3xl p-5">
                        Your order is complete!
                    </p>
                    <div class="text-center items-center md:p-5 py-2">
                        <p class="text-center items-center text-black dark:text-white text-xl p-5">
                            Press this button when to unlock the robot when it arrives.
                        </p>
                        <button class="bg-light-orange hover:bg-dark-orange p-3 px-5 rounded-3xl text-2xl">
                            Unlock Container
                        </button>
                    </div>
                </section>
                
            <Footer/>
        </>
    );
}

