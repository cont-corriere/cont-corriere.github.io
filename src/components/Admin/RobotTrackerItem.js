import { CiCircleChevDown } from "react-icons/ci";
import DropdownItem from "./DropdownItem";

const handleExpandView = (props) => {
	return <div>{props.isVisible ? <p>more details</p> : null}</div>;
};

const RobotTrackerItem = (props) => {
	const container_status = [];
	const robot = props.robot;

	// TODO - how to determine if it is faulty or not?
	// TODO - what does see more details do? How to show the other additional info?
	for (let i = 0; i < robot.lockers.length; i++) {
		container_status.push(<DropdownItem locker={robot.lockers[i]} />);
	}

	return (
		<div className="flex flex-col justify-center border-2 rounded-md pb-4">
			<div className="flex justify-center py-4">
				<img
					src="icons/corriere_vector.png"
					alt="Robo"
					className="md:w-24 w-12 object-contain"
				></img>
			</div>
			<div class="text-center text-lg py-4">
				<p>Robot ID: {robot.robotId}</p>
				<p>Location: {robot.location}</p>
				<p>Destination: {robot.destination}</p>
			</div>

			<div className="px-4 space-y-2">{container_status}</div>
			{/* Button removed for now */}
			{/* <div className="text-center pt-4">
				<button class="bg-light-orange hover:bg-dark-orange rounded-3xl px-5 py-2">
					<p class="">See more details</p>
				</button>
			</div> */}
		</div>
	);
};

export default RobotTrackerItem;
