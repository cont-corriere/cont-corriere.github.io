import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation} from "react-router-dom";

import { NavBar } from "../Miscellaneous/NavBar";
import { Footer } from "../Miscellaneous/Footer";

export default function CartError(){


    return(  
        <>
            <NavBar/>
            <div className="">
				<section class="flex flex-col text-black dark:text-white bg-gray-50 dark:bg-gray-900 h-screen justify-center  text-center ">
                    <div>
                        <p className="text-center items-center text-black dark:text-white text-3xl p-5">
                            Your cart is empty!
                        </p>
                        <p className="text-center items-center text-black dark:text-white text-2xl p-5">
                            Go to Cart to see your current orders and passcodes!
                        </p>
                        <Link to={"/dashboard"}>
                            <p className="m-6 text-center text-black hover:text-blue-500 hover:underline dark:text-white">
                                Return to home
                            </p>
                        </Link>
                    </div>
                </section>
            </div>
        <Footer />
        </>
    );
}