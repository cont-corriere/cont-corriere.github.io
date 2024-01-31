import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { NavBar } from "../Miscellaneous/NavBar";
import { Footer } from "../Miscellaneous/Footer";

const History = () => {
	
	return (
        <div>
            <NavBar/>
            

            <section class="flex flex-col bg-gray-50 dark:bg-gray-900 min-h-screen px-8 py-2">
				<h1 class="text-center items-center text-black dark:text-white font-bold text-5xl p-5">
					History
				</h1>
            <div class="flex flex-col items-center py-2 space-y-10"></div>
                <div className="dark:bg-gray-900 border-2 rounded-3xl items-center ml-20 mr-20 mt-5">
                    <p className="text-center text-black dark:text-white text-xl p-5">
                        History is empty
                    </p>
                </div>  
                
			</section>
            <Footer/>
            
		</div>
	);
};

export default History;
