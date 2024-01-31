import { React, useEffect, useState} from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { Footer } from "../Miscellaneous/Footer";
import { NavBar } from "../Miscellaneous/NavBar";
import { getLocalStorageProfile, getRestaurant, addToCart } from "../../utils/Utils";


export default function Menu() {
    const [restaurant, setRestaurant] = useState(null);

    useEffect(() => {
        fetchRestaurant();
    }, []);

    // fetch parameters from Link
    const location = useLocation();
    const restaurantName = location.state?.name;

    const fetchRestaurant = async () => {
		if(restaurantName !== null){
            setRestaurant(await getRestaurant(restaurantName));
        }
	}


    window.scrollTo(0, 0);

	return(
		<>
        <NavBar/>
        {restaurant !== null && (
            <section class="flex flex-col bg-gray-50 dark:bg-gray-900 h-full px-8 py-2">
                <div class="text-left items-left md:p-5 py-2">
                    <Link to={"/dashboard"}>
                        <button class="bg-dark-grey hover:bg-gray-300 dark:bg-light-grey dark:hover:bg-gray-300 p-3 px-5 rounded-3xl text-2xl">
                            &lt;
                        </button>
                    </Link>
                </div>

                <div>
                    <div class="text-center items-center text-black dark:text-white font-bold text-3xl px-5 mb-5">
                        {restaurantName}
                    </div>
                    <div class="text-center items-center justify-center flex">
                        <img src={restaurant.image} alt="restaurant" class="object-cover object-center w-96 rounded-xl"></img>
                    </div>
                    <div class="text-black dark:text-gray-300 py-4 px-12 text-center">
                        {restaurant.description}
                    </div>
                    <div class="text-black dark:text-gray-300 py-1 px-12 text-center">
                        Delivery Fee: {restaurant.deliveryFee}
                    </div>
                    <div class="text-black dark:text-gray-300 py-1 px-12 text-center">
                        Delivery Time: {restaurant.deliveryTime} minutes
                    </div>
                    <div class="text-black dark:text-gray-300 py-1 px-12 text-center">
                        Category: {restaurant.category}
                    </div>
                </div>
                
                <div class="grid md:grid-cols-3 gap-5 ml-10 mr-10 mt-5">
                    {restaurant.menu.map((item, index) => (
                        item.isAvailable && (
                            <div key={index} class="rounded-2xl bg-white overflow-hidden border-4 mb-3 text-center">
                                <img
                                    className="w-full h-64 object-cover"
                                    src={item.image}
                                    alt="food"
                                />
                                <div class="px-6 py-3">
                                    <p class="font-bold text-left text-2xl mb-2">{item.name}</p>
                                    <div class="text-left text-xl">
                                        <p class="text-black inline">{item.description}</p>
                                    </div>
                                    <div class="text-left font-bold text-xl">
                                        <p class="text-black inline">S$ {item.price}</p>
                                    </div>
                                    <div class="text-center text-lg py-2">
                                        {/* TODO- add to shopping cart, if guest, prompt to sign in or just normally add to cart / local storage? (data will be lost) */}
                                        <button onClick={() => addToCart(item, getLocalStorageProfile("userId"), restaurant.name)} class="bg-light-orange hover:bg-dark-orange rounded-3xl px-5 py-2">
                                            <p class="font-bold">Add to Cart</p>
                                        </button>
                                    </div>
                                </div>
                                <br></br>
                            </div>                       
                        )  
                    ))}
                </div>
            </section>
        )}

        <Footer/>

		</>
	);
}