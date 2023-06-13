import React from "react";
import CreateNewList from "../CreateNewList";
import Lists from "../Lists";

const Sidebar = () => {
	return (
		<div className="column is-3">
			<CreateNewList />
			<Lists />
		</div>
	)
};

export default Sidebar;
