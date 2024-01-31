const StatusBlock = (props) => {
	if (props.condition) {
		return (
			<div className="flex flex-row justify-between border-2 rounded-xl px-4 bg-green-600">
				<div className="w-1/2">
					<p>{props.text}</p>
				</div>

				<div className="w-1/2">true</div>
			</div>
		);
	} else {
		return (
			<div className="flex flex-row justify-between border-2 rounded-xl px-4 bg-red-600">
				<div className="w-1/2">
					<p>{props.text}</p>
				</div>

				<div className="w-1/2">false</div>
			</div>
		);
	}
};

export default StatusBlock;
