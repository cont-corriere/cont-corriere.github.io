
import { initializeApp, firebase } from "firebase/app";
import { firebaseConfig } from "../myFirebase";
// import 'firebase/database';
import { getDatabase, set, push, ref, child, get, onValue, update, remove} from "firebase/database";

/********************************* USER DATABASE FUNCTIONS *********************************/

// gets users.json from firebase db
export async function getAllUsersJson(){
    // console.log("fetching");

    try {
        const response = await fetch("https://corriere-a33bc-default-rtdb.asia-southeast1.firebasedatabase.app/users.json", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        // console.log(data);

        return data;
    } 
	
	catch (error) {
        console.error("Error occurred: ", error);
        alert("Error Occurred");
        throw error;
    }
}

// returns user's profile (JSON) if found, null if not found
export function getUserDetails(jsonObject, email){
    for(const userType in jsonObject) {
        for(const user in jsonObject[userType]) {
            if(jsonObject[userType][user].profile.email === email) {
                console.log(jsonObject[userType][user].profile.email + " found with pw " + jsonObject[userType][user].profile.password);
                return jsonObject[userType][user].profile;
            }
        }
    }
    console.log("Email not found");
    return null;
}

// check if user is admin, merchant or customer
export function getUserType(jsonObject, userId){
    for(const userType in jsonObject){
        for(const user in jsonObject[userType]) {
            if(jsonObject[userType][user].profile.userId === userId) {
                return userType;
            }
        }
    }
    console.log("userId " + userId + " not found!");
    return null;
}

// returns new user ID (userType must be customer/admin/merchant)
export function getNewUserId(jsonObject, userType){
    let lastUserId = '0';

    if(userType!== "customer" && userType!== "admin" && userType!== "merchant"){
        console.log("invalid user type");
        return null;
    }

    let userGroup = jsonObject[userType + 's'];

    for(const userKey in userGroup){
        const userId = userGroup[userKey]?.profile?.userId || '0';
        if(userId > lastUserId){
            lastUserId = userId;
        }
    }

    let numId = parseInt(lastUserId.slice(1), 10) + 1;
    let paddedNumId = numId.toString().padStart(8, '0');
    let newId = userType.charAt(0).toUpperCase() + paddedNumId;
    // console.log(newId);
    return newId;
}

// returns a user profile key from database
export async function getUserProfile(userId, profileKey){
    let usersJson = await getAllUsersJson();
    for(let userType in usersJson){
        for(let user in usersJson[userType]){
            if(usersJson[userType][user].profile.userId === userId){
                try{
                    return usersJson[userType][user].profile[profileKey] || null;
                }
                catch{
                    console.log("Profile key " + profileKey + " not found!");
                    return null;
                }
            }
        }
    }
}

/********************************* ROBOT DATABASE FUNCTIONS *********************************/

// gets robots.json from firebase db
export async function getAllRobotsJson(){
    console.log("fetching");

    try {
        const response = await fetch("https://corriere-a33bc-default-rtdb.asia-southeast1.firebasedatabase.app/robots.json", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        // console.log(data);

        return data;
    } 
	
	catch (error) {
        console.error("Error occurred: ", error);
        throw error;
    }
}

// returns one robot's [robotID, lockerID, robotNo, lockerNo] that is available (TODO - Optimise algorithm cuz rn it's just seeing which locker is idle)
export async function getAvailableRobot(){
    let robotJson = await getAllRobotsJson();
    for(let robot in robotJson){
        if(robotJson[robot].status === "OK"){
            for(let lockerNo in robotJson[robot].lockers){
                if(robotJson[robot].lockers[lockerNo].status === "idle"){
                    let robotId = robotJson[robot].robotId;
                    let lockerId = robotJson[robot].lockers[lockerNo].lockerId;
                    let robotNum = robot;
                    let lockerNum = lockerNo;
                    // console.log([robotId, lockerId, robotNum, lockerNum]);
                    return [robotId, lockerId, robotNum, lockerNum];
                }
            }
        }
    }
    console.log("no robot available");
    return null;
}

// TODO - return true if passcode and order ID are set in the locker 
// requires locker and robot no which should be retrieved from user's order


// sets locker's status
export async function setLockerStatus(robotNo, lockerNo, status){
    const validStatus = [
        "idle", 
        "busy",
        "error",
        "waiting for merchant",
        "waiting for customer",
        "delivering to customer",
        "delivering to merchant", // maybe not "delivering" per se...
        "customer is taking food"
    ]
    if(!status.includes(status)){
        console.error("@setLockerStatus: Status set does not match any of the valid status");
    }
    else{
        try{
            const app = initializeApp(firebaseConfig);
            const db = getDatabase();
            // console.log(`robots/${robotNo}/lockers/${lockerNo}`);
            const refDb = ref(db, `robots/${robotNo}/lockers/${lockerNo}`);
            update(refDb, {'status': status});
        }
        catch{
            console.error("@setLockerStatus: error updating locker status");
        }
    }
}

// sets locker's passcode
export async function setLockerPasscode(robotNo, lockerNo, passcode){
    try{
        const app = initializeApp(firebaseConfig);
        const db = getDatabase();
        const refDb = ref(db, `robots/${robotNo}/lockers/${lockerNo}`);
        update(refDb, {'passcode': passcode});
    }
    catch{
        console.error("error updating locker passcode");
    }
}

// not really necessary..? maybe remove the field? sets locker order ID TODO- update user's order id also
export async function setLockerOrderId(robotNo, lockerNo, orderId){
    try{
        const app = initializeApp(firebaseConfig);
        const db = getDatabase();
        const refDb = ref(db, `robots/${robotNo}/lockers/${lockerNo}`);
        update(refDb, {'orderId': orderId});
    }
    catch{
        console.error("error updating locker orderID");
    }
}

// set time ordered (system time) - this field is not at the JSON at the moment
// export async function setLockerTimeOrdered(robotNo, lockerNo, timeOrdered){
//     try{
//         const app = initializeApp(firebaseConfig);
//         const db = getDatabase();
//         const refDb = ref(db, `robots/${robotNo}/lockers/${lockerNo}`); // note this is robotNo and lockerNo, not ID! TODO- conversion to no function
//         update(refDb, {'timeOrdered': timeOrdered});
//     }
//     catch{
//         console.error("error updating time");
//     }
// }

// sets locker's boolean variables (isDoorOpen, isEmpty, isFloorOpen, isLightOn, etc)
export async function setLockerValue(robotNo, lockerNo, key, value){
    const validKeys = [
        "isDoorOpen",
        "isEmpty",
        "isFloorOpen",
        "isLightOn",
        "lockerId", // just in case
        "orderId",
        "passcode", 
        "status"
    ];
    if(!validKeys.includes(key)){
        console.error("@setLockerStatus: Status set does not match any of the valid status");
    }
    else{
        try{
            const app = initializeApp(firebaseConfig);
            const db = getDatabase();
            const refDb = ref(db, `robots/${robotNo}/lockers/${lockerNo}`);
            update(refDb, {key: value});
        }
        catch{
            console.error("error updating locker value with key " + key);
        }
    }
}


// returns the specified robot locker
/*
    Usage:
    const [robot, setRobot] = useState();
    const robotLocker = await getRobotLocker(availableRobot[2], availableRobot[3]);
    setRobot(robotLocker.isDoorOpen + "");
    <p className="text-center items-center text-black dark:text-white text-3xl p-5">
        Robot Door Open: {robot}
    </p>
*/
export async function getRobotLocker(robotNo, lockerNo){
    let robotJson = await getAllRobotsJson();
    try{
        console.log(robotJson[robotNo].lockers[lockerNo]);
        return robotJson[robotNo].lockers[lockerNo];
    }
    catch{
        console.error("@getRobotLocker: Unable to fetch robot locker.")
    }
}


/********************************* RESTAURANT/DASHBOARD DATABASE FUNCTIONS *********************************/
// retrieves all restaurant JSON
export async function getAllMerchantsJson(){
    console.log("fetching merchants...");

    try {
        const response = await fetch("https://corriere-a33bc-default-rtdb.asia-southeast1.firebasedatabase.app/users/merchants.json", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        // console.log(data);

        return data;
    } 
	
	catch (error) {
        console.error("Error occurred: ", error);
        alert("Error Occurred");
        throw error;
    }
}

// returns an array of restaurant Jsons
export async function getAllRestaurantsJson(){
    const merchantsJson = await getAllMerchantsJson();
    const restaurantList = [];
    for(let merchant in merchantsJson){
        restaurantList.push(merchantsJson[merchant].restaurant);
    }
    return restaurantList;
}

export async function getRestaurant(restaurantName){
    const restaurantList = await getAllRestaurantsJson();
    for(let restaurant in restaurantList){
        if(restaurantList[restaurant].name === restaurantName){
            return restaurantList[restaurant];
        }
    }
}

// returns orders from a merchant's user Id
export async function getOrdersFromUserId(userId){
    let merchantsJson = await getAllMerchantsJson();
    for(let merchant in merchantsJson){
        if(merchantsJson[merchant].profile.userId === userId){
            try{
                // console.log(merchantsJson[merchant].orders);
                return merchantsJson[merchant].orders || null;
            }
            catch(error){
                console.log(error);
                return null;
            }
        }
    }
    console.log("userId " + userId + " not found!");
    return null;
}

/********************************* CUSTOMER FUNCTIONS *********************************/
// retrieves all customers
export async function getAllCustomersJson(){
    // console.log("fetching customers...");

    try {
        const response = await fetch("https://corriere-a33bc-default-rtdb.asia-southeast1.firebasedatabase.app/users/customers.json", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        // console.log(data);

        return data;
    } 
	
	catch (error) {
        console.error("Error occurred: ", error);
        alert("Error Occurred");
        throw error;
    }
}

// get user key from user ID (can be either customer, admin  or merchant)
export async function getUserKey(userId){
    let usersJson = await getAllUsersJson();

    for(let userType in usersJson){
        for(let user in usersJson[userType]){
            if(usersJson[userType][user].profile.userId === userId){
                return user;
            }
        }
    }
    return null;
}

/********************************* CART / ORDER FUNCTIONS *********************************/

export async function getOrders(userId){
    // TODO - Guest users --> local storage?
    let customersJson = await getAllCustomersJson();
    for(let customer in customersJson){
        if(customersJson[customer].profile.userId === userId){
            return customersJson[customer].orders || null;
        }
    }
    console.log("No orders found in username " + userId);
    return null;
}

export async function getOrdersArray(userId){
    let cartArray = [];
    let customersJson = await getAllCustomersJson();
    for(let customer in customersJson){
        if(customersJson[customer].profile.userId === userId){
            if(customersJson[customer].orders != null){
                for(let order in customersJson[customer].orders){
                    cartArray.push(customersJson[customer].orders[order]);
                }
                if(cartArray != null){
                    console.log(cartArray);
                    return cartArray;
                }
            }
            else{
                return null;
            }
        }
    }
    console.log("No orders found in userId " + userId);
    return null;
}


// get user cart with the restaurant name as key
export async function getCart(userId){
    let customersJson = await getAllCustomersJson();
    for(let customer in customersJson){
        if(customersJson[customer].profile.userId === userId){
            if(customersJson[customer].cart != null){
                console.log(customersJson[customer].cart.items);
                return customersJson[customer].cart.items;
            }
            else{
                return null;
            }
        }
    }
    console.log("No carts found in userId " + userId);
    return null;
}

// get user cart without restaurant name as key
export async function getRestaurantCart(userId, restaurantName){
    const app = initializeApp(firebaseConfig);
    const db = ref(getDatabase());
    let customersJson = await getAllCustomersJson();
    for(let customer in customersJson){
        if(customersJson[customer].profile.userId === userId){
            if(customersJson[customer].cart != null){
                try{
                    // console.log(customersJson[customer].cart.items[restaurantName]);
                    return customersJson[customer].cart.items[restaurantName];
                }
                catch(error){
                    console.log(error);
                }
            }
            else{
                console.log("No carts found in userId " + userId);
                return null;
            }
            // await get(child(db, `users/customers/${customer}/cart`)).then((snapshot) => {
            //     if (snapshot.exists()) {
            //         console.log("snapshot exist")
            //         try{
            //             console.log("@getRestaurantCart - cart not null")
            //             console.log(customersJson[customer].cart.items[restaurantName]);
            //             return customersJson[customer].cart.items[restaurantName] || null;
            //         }
            //         catch(error){
            //             console.log("caught")
            //             console.error(error);
            //             return null;
            //         }
            //     }
    
            // })
        }
    }
    
}

// get cart as an array
export async function getCartArray(userId){
    let cartArray = [];
    let customersJson = await getAllCustomersJson();
    for(let customer in customersJson){
        if(customersJson[customer].profile.userId === userId){
            if(customersJson[customer].cart != null){
                for(let restaurant in customersJson[customer].cart.items){
                    cartArray.push({
                        name: restaurant,
                        items: customersJson[customer].cart.items[restaurant]
                    });
                }
                if(cartArray != null){
                    return cartArray;
                }
            }
            else{
                return null;
            }
        }
    }
    console.log("No carts found in userId " + userId);
    return null;
}

// adds a restaurant's menu item to the current user's cart
export async function addToCart(order, userId, restaurantName){
    console.log(order);

    let customerJson = await getAllCustomersJson();
    let cart = await getRestaurantCart(userId, restaurantName);

    let cartLength = 0;

    if(cart != null){
        console.log("cart is not null");
        cartLength = Object.keys(cart).length;
    }

    console.log(cartLength);
    
    if(customerJson !== null){
        for(let customer in customerJson){
            if(customerJson[customer].profile.userId === userId){
                console.log("userID found " + userId);
                try{
                    const app = initializeApp(firebaseConfig);
                    const db = getDatabase();
                    // console.log(`users/customers/${customer}/cart/items/`);
                    set(ref(db, `users/customers/${customer}/cart/items/` + restaurantName + `/${cartLength}`), {
                        description: order.description,
                        image: order.image,
                        isAvailable: order.isAvailable,
                        name: order.name,
                        price: order.price
                    });
                    // const refDb = ref(db, `users/customers/${customer}/cart/items`);
                    // update(refDb, {[cartLength]: order});
                    alert(`Item ${order.name} is added to your cart!`);
                }
                catch(error){
                    throw error;
                }
            }
        }
    }
}


// sends order to merchant's orders
export async function sendOrderToMerchant(userId, orderId, robotId, lockerId, timeOrdered, address, restaurantName){
    let merchantsJson = await getAllMerchantsJson();
    let userCart = await getRestaurantCart(userId, restaurantName);
    let cartLength = 0;

    // console.log(userId, orderId, robotId, lockerId, timeOrdered, restaurantName)
    console.log(userCart);
    for(let merchant in merchantsJson){
        if(merchantsJson[merchant].restaurant.name === restaurantName){
            const app = initializeApp(firebaseConfig);
            const db = getDatabase();

            try{
                cartLength = Object.keys(merchantsJson[merchant].orders).length;
            } catch {}
            
            
            // Problem with cart length as key --> if deleted, can override
            set(ref(db, `users/merchants/${merchant}/orders/` + cartLength), {
                "address": address,
                "items": userCart,
                "orderId": orderId,
                "robotId": robotId,
                "lockerId": lockerId,
                "timeOrdered": timeOrdered,
            });
        }
    }
}

export async function sendOrderToCustomer(userId, orderId, robotId, lockerId, passcode, timeOrdered, address, restaurantName){
    let customersJson = await getAllCustomersJson();
    let userOrder = await getRestaurantCart(userId, restaurantName);
    let orderLength = 0;

    console.log(userId, orderId, robotId, lockerId, passcode, restaurantName);

    for(let customer in customersJson){
        if(customersJson[customer].profile.userId === userId){
            try{
                orderLength = Object.keys(customersJson[customer].orders).length;
            } catch{}
    
            console.log(orderLength);
            
            const app = initializeApp(firebaseConfig);
            const db = getDatabase();
            set(ref(db, `users/customers/${customer}/orders/` + orderLength), {
                "address": address,
                "items": userOrder,
                "orderId": orderId,
                "robotId": robotId,
                "lockerId": lockerId,
                "passcode": passcode,
                "timeOrdered": timeOrdered,
            });
        }
       
    }
}



// sends order to specified robot
export async function sendOrderToRobot(userId, orderId, robotNo, lockerNo, passcode, timeOrdered, address, restaurantName){
    let userCart = await getRestaurantCart(userId, restaurantName);

    let app = initializeApp(firebaseConfig);
    const db = getDatabase();
    set(ref(db, `robots/${robotNo}/lockers/${lockerNo}/address/`), address);
    set(ref(db, `robots/${robotNo}/lockers/${lockerNo}/order/`), userCart);
    set(ref(db, `robots/${robotNo}/lockers/${lockerNo}/orderId/`), orderId);
    set(ref(db, `robots/${robotNo}/lockers/${lockerNo}/passcode/`), passcode);
    set(ref(db, `robots/${robotNo}/lockers/${lockerNo}/timeOrdered/`), timeOrdered);
    // status? or no need
}

// deletes the user's cart depending on restaurantName once order is sent and move it to orders instead
export async function deleteUserCart(userId, restaurantName){
    let userKey = await getUserKey(userId);

    let app = initializeApp(firebaseConfig);
    let db = getDatabase();
    await remove(ref(db, `/users/customers/${userKey}/cart/items/${restaurantName}`)).then(() => {
        console.log("Data deleted successfully");
    })
}

/********************************* SETTINGS FUNCTIONS *********************************/

export async function updateSettings (userType, userId, phone, cardNo, address) {
	try {
		const app = initializeApp(firebaseConfig);
		const db = getDatabase();
		// console.log(`robots/${robotNo}/lockers/${lockerNo}`);
		const userKey = await getUserKey(userId);
		const refDb = ref(db, `users/${userType}/${userKey}/profile`);
		update(refDb, { phone: phone, cardNo: cardNo, address: address });
	} catch {
		console.error("@setLockerStatus: error updating locker status");
	}
};

/********************************* LOCAL STORAGE FUNCTIONS *********************************/
// set Local Storage Profile
export function setLocalStorageProfile(value){
    localStorage.setItem("corriere-web-app-user-profile", JSON.stringify(value));
}

// get Local Storage Profile
export function getLocalStorageProfile(profileKey){
    try{
        let data = JSON.parse(localStorage.getItem("corriere-web-app-user-profile"));
        return data[profileKey] || "Guest";
    }
    catch(error){
        console.log(error);
    }
}


/********************************* SESSION STORAGE FUNCTIONS *********************************/
// set Session Storage to prevent generated code page from refreshing
export async function setSessionStorage(value){
    sessionStorage.setItem("corriere-web-app-session-storage", JSON.stringify(value));
}

export async function getSessionStorage(key){
    try{
        let data = JSON.parse(sessionStorage.getItem("corriere-web-app-session-storage"));
        return data[key] || null;
    }
    catch(error){
        console.log(error);
    }
}

export async function clearSessionStorage(){
    sessionStorage.clear();
}

/********************************* OTHER FUNCTIONS *********************************/
// generate random number code
export function generateRandomCode(noDigits){
    let generatedCode = "";
    for(let x = 0; x < noDigits; x++){
        generatedCode += Math.floor(Math.random() * 10);
    }
    return generatedCode;
}

// TODO - look into generating secure order IDs; for now is random
export function generateOrderId(){
    let generatedId = "";
    let noDigits = 10;
    for(let x = 0; x < noDigits; x++){
        generatedId += Math.floor(Math.random() * 10);
    }
    // console.log(generatedId)
    return generatedId;
}

// returns true if email has a duplicate, false otherwise.
export function checkEmailDuplicate(jsonObject, givenEmail){
    let adminEmails = []
    let customerEmails = []
    let merchantEmails = []
    
    adminEmails = Object.values(jsonObject.admins).map(admin => admin.profile.email);
    customerEmails = Object.values(jsonObject.customers).map(customer => customer.profile.email);
    merchantEmails = Object.values(jsonObject.merchants).map(merchant => merchant.profile.email);

    // console.log(adminEmails, customerEmails, merchantEmails);

    if(adminEmails.includes(givenEmail) || customerEmails.includes(givenEmail) || merchantEmails.includes(givenEmail)){
        alert(`email ${givenEmail} is already used!`)
        return true;
    }
    else{
        return false;
    }
}

export function getISOTime(){
    // using ISO 8601 format (UTC): 2024-01-08T03:07:40.607Z
    const currentDate = new Date().toISOString();
    console.log(currentDate);
    return currentDate;
}

export function getReadableTime(isoTime){
    // without options: 08/01/2024, 11:07:40
    const currentDate = new Date(isoTime);
    const readableDate = currentDate.toLocaleString();
    console.log(readableDate);

    /* with options: January 8, 2024 at 11:06:38 AM GMT+8
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
        const readableDateWithOptions = currentDate.toLocaleString('en-US', options);
        console.log(readableDateWithOptions); 
    */

    return readableDate;
}