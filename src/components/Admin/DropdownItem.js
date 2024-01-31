import { useState } from "react";
import { CiCircleChevDown } from "react-icons/ci";
import StatusBlock from "./StatusBlock.js";

const DropdownItem = (props) => {
	const [expandView, setExpandView] = useState(false);

	const expandViewHandler = () => {
		setExpandView(!expandView);
	};

	console.log(props.locker);

	if (props.locker.status !== "error") {
		return (
			<div className="flex flex-col justify-between border-2 rounded-xl py-2 px-6 bg-green-600">
				<div className="flex flex-row justify-between">
					<p>Locker {props.locker.lockerId}</p>
					<p>Status: {props.locker.status}</p>
					<CiCircleChevDown size={24} onClick={expandViewHandler} />
				</div>
				<div>
					{expandView ? (
						<>
							<div className="p-2 text-center">
								<p>Order Id: {props.locker.orderId}</p>
								<p>Destination: {props.locker.address}</p>
								<p>Passcode: {props.locker.passcode}</p>
								<p>Temperature: 29 °C</p>
							</div>
							<div className="flex flex-row">
								<div className="w-1/4"></div>
								<div className="w-2/4 justify-center text-center space-y-2">
									<StatusBlock
										className=""
										text={"isDoorOpen"}
										condition={props.locker.isDoorOpen}
									/>
									<StatusBlock
										className=""
										text={"isEmpty"}
										condition={props.locker.isEmpty}
									/>
									<StatusBlock
										className=""
										text={"isFloorOpen"}
										condition={props.locker.isFloorOpen}
									/>
									<StatusBlock
										className=""
										text={"isLightOn"}
										condition={props.locker.isLightOn}
									/>
									<StatusBlock
										className=""
										text={"isUnlocked"}
										condition={props.locker.isUnlocked}
									/>
								</div>
							</div>
						</>
					) : (
						<></>
					)}
				</div>
			</div>
		);
	} else {
		return (
			<div className="flex flex-col justify-between border-2 rounded-xl py-2 px-6 bg-red-600">
				<div className="flex flex-row justify-between">
					<p>Locker {props.locker.lockerId}</p>
					<p>Status: {props.locker.status}</p>
					<CiCircleChevDown size={24} onClick={expandViewHandler} />
				</div>
				<div>
					{expandView ? (
						<>
							<div className="p-2 text-center">
								<p>Order Id: {props.locker.orderId}</p>
								<p>Destination: {props.locker.address}</p>
								<p>Passcode: {props.locker.passcode}</p>
								<p>Temperature: 29 °C</p>
							</div>
							<div className="flex flex-row">
								<div className="w-1/4"></div>
								<div className="w-2/4 justify-center text-center space-y-2">
									<StatusBlock
										className=""
										text={"isDoorOpen"}
										condition={props.locker.isDoorOpen}
									/>
									<StatusBlock
										className=""
										text={"isEmpty"}
										condition={props.locker.isEmpty}
									/>
									<StatusBlock
										className=""
										text={"isFloorOpen"}
										condition={props.locker.isFloorOpen}
									/>
									<StatusBlock
										className=""
										text={"isLightOn"}
										condition={props.locker.isLightOn}
									/>
									<StatusBlock
										className=""
										text={"isUnlocked"}
										condition={props.locker.isUnlocked}
									/>
								</div>
							</div>
						</>
					) : (
						<></>
					)}
				</div>
			</div>
		);
	}
};

export default DropdownItem;
