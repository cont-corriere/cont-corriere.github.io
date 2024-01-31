import { initializeApp, firebase } from "firebase/app";
import { firebaseConfig } from "../myFirebase";
// import 'firebase/database';
import {
	getDatabase,
	set,
	push,
	ref,
	child,
	get,
	onValue,
	update,
	remove,
} from "firebase/database";
import { getUserType } from "./Utils";

export async function writeNewPost(uid, username, picture, title, body) {
	const db = getDatabase();

	e.preventDefault();
	const data = await getAllUsersJson();

	try {
		const app = initializeApp(firebaseConfig);
		const db = getDatabase();
		// console.log(`robots/${robotNo}/lockers/${lockerNo}`);

		const userType = getUserType();
		const refDb = ref(db, `robots/${robotNo}/lockers/${lockerNo}`);
		update(refDb, { status: status });
	} catch {
		console.error("@setLockerStatus: error updating locker status");
	}

	// A post entry.
	const postData = {
		author: username,
		uid: uid,
		body: body,
		title: title,
		starCount: 0,
		authorPic: picture,
	};

	// Get a key for a new Post.
	const newPostKey = push(child(ref(db), "posts")).key;

	// Write the new post's data simultaneously in the posts list and the user's post list.
	const updates = {};
	updates["/posts/" + newPostKey] = postData;
	updates["/user-posts/" + uid + "/" + newPostKey] = postData;

	return update(ref(db), updates);
}
