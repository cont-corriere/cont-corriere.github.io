import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation} from "react-router-dom";

import { NavBar } from "../Miscellaneous/NavBar";
import { Footer } from "../Miscellaneous/Footer";

import { generateRandomCode, getLocalStorageProfile, getRestaurantCart, getUserProfile, getSessionStorage, setSessionStorage, getAvailableRobot, generateOrderId, setLockerStatus, setLockerOrderId, setLockerPasscode, getReadableTime, getISOTime, deleteUserCart, sendOrderToMerchant, sendOrderToRobot, sendOrderToCustomer} from "../../utils/Utils";


export default function GeneratedCode(){
    const [passcode, setPasscode] = useState();
    const [robotId, setRobotId] = useState(null);
    const [lockerId, setLockerId] = useState(null);
    const [robotNo, setRobotNo] = useState(null);
    const [lockerNo, setLockerNo] = useState(null);
    const [orderId, setOrderId] = useState("");
    const [userId, setUserId] = useState("");

    const location = useLocation();
    const restaurantName = location.state?.restaurantName;
    const isOrdering = location.state?.isOrdering || false;

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            await generatePasscode();
            await getRobotDetails();
            await getOrderId();
        };
        if(isOrdering){
            fetchData();
        }
    }, []);

    useEffect(() => {
        const updateStatus = async () => {
            await updateLockerDetails();
        };
        if(isOrdering){
            updateStatus();
        }
        
    }, [robotId]);

    useEffect(() => {
        const updateCart = async () => {
            await deleteCart();
        };
        if(isOrdering){
            updateCart();
        }
    }, [orderId]);
    


    const generatePasscode = () => {
        setPasscode(generateRandomCode(6));
    }

    const deleteCart = async () => {
        let localUserId = await getLocalStorageProfile("userId");
        if(localUserId !== "" && localUserId !== "Guest" && robotId !== null){
            // CHANGE LOCAL STORAGE DETAILS IN SETTINGS PAGE??? or directly get from database
            let address = await getUserProfile(localUserId, "address");
            console.log(address);

            let currCart = await getRestaurantCart(localUserId, restaurantName);
            // console.log(currCart);
            if(currCart !== null){
                console.log("deleting user cart...");
                setUserId(localUserId);
                let currTime = await getReadableTime(await getISOTime());
                await sendOrderToMerchant(localUserId, orderId, robotId, lockerId, currTime, address, restaurantName);
                await sendOrderToCustomer(localUserId, orderId, robotId, lockerId, passcode, currTime, address, restaurantName);
                await sendOrderToRobot(localUserId, orderId, robotNo, lockerNo, passcode, currTime, address, restaurantName);
                await deleteUserCart(localUserId, restaurantName);
            }
            else{
                navigate("/cartError")
            }
        }
        
    }

    const getRobotDetails = async () => {
        const availableRobot = await getAvailableRobot();
        if(availableRobot !== null){
            setRobotId(availableRobot[0]);
            setLockerId(availableRobot[1]);
            setRobotNo(availableRobot[2]);
            setLockerNo(availableRobot[3]);
        }
        else{
            console.log("available robot null!");
        }
    }

    const getOrderId = () => {
        setOrderId(generateOrderId());
    }

    const updateLockerDetails = async () => {
        if(robotId !== null){
            // console.log("updating locker details...");
            await setLockerStatus(robotNo, lockerNo, "busy"); 
            await setLockerPasscode(robotNo, lockerNo, passcode);
            await setLockerOrderId(robotNo, lockerNo, orderId);
        }
    }
    

    return(  
        <>
            <NavBar/>
            <div className="">
				<section class="flex flex-col text-black dark:text-white bg-gray-50 dark:bg-gray-900 h-screen justify-center  text-center ">
					{/* Only display this section if robot is available */}
                    {robotId !== null ? (
                    <section className="flex flex-col bg-gray-50 dark:bg-gray-900 h-screen justify-center px-8 py-2">
                        {/* TODO - Insert green tick icon here */}
                        <p className="text-center items-center text-black dark:text-white text-3xl p-5">
                            Your order has been successfully placed!
                        </p>
                        <p className="text-center items-center text-black dark:text-white text-3xl p-5">
                            Here are your order details:
                        </p>
                        <p className="text-center items-center text-black dark:text-white text-3xl p-5">
                            Order ID: {orderId}
                        </p>
                        <p className="text-center items-center text-black dark:text-white text-3xl p-5">
                            Robot ID: {robotId}
                        </p>
                        <p className="text-center items-center text-black dark:text-white text-3xl p-5">
                            Locker number: {lockerId}
                        </p>
                        <p className="text-center items-center text-black dark:text-white text-3xl p-5">
                            Passcode: {passcode}
                        </p>
                    </section>

                ) : (
                    <div>
                        {isOrdering == false ? (
                            <div>
                            <p className="text-center items-center text-black dark:text-white text-3xl p-5">
                                You are not ordering!
                            </p>
                            <p className="text-center items-center text-black dark:text-white text-2xl p-5">
                                Go to Cart and click Check Out to place an order!
                            </p>
                            <Link to={"/dashboard"}>
                                <p className="m-6 text-center text-black hover:text-blue-500 hover:underline dark:text-white">
                                    Return to home
                                </p>
                            </Link>
                            </div>
                        ) : (
                            <>
                                <p className="text-center items-center text-black dark:text-white text-3xl p-5">
                                    Oops! All robots are preoccupied at the moment. Order again
                                    in a few minutes.
                                </p>
                                <Link to={"/dashboard"}>
                                    <p className="m-6 text-center text-black hover:text-blue-500 hover:underline dark:text-white">
                                        Return to home
                                    </p>
                                </Link>
                            </>
                        )}
                        </div>
                    )}
                </section>
            </div>
        <Footer />
        </>
    );
}