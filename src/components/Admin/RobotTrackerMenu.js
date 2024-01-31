import RobotTrackerItem from "./RobotTrackerItem";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllRobotsJson } from "../../utils/Utils";

const RobotTrackerMenu = () => {
	const [robotJson, setRobotJson] = useState(null);

	useEffect(() => {
		getAllRobots();
	}, []);

	const getAllRobots = async () => {
		setRobotJson(await getAllRobotsJson());
	};

	return (
		<>
			{robotJson !== null && (
				<div>
					<br></br>
					<p className="px-8 text-3xl font-bold ">Robot Status</p>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 pb-10">
						{robotJson.map((item, index) => (
							<RobotTrackerItem key={index} robot={item} />
						))}
					</div>
				</div>
			)}
		</>
	);
};

export default RobotTrackerMenu;
