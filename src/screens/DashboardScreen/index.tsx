import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Message from "../../components/Message";
import { setSuccess } from "../../store/actions/authActions";
import { RootState } from "../../store";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import Sidebar from "../../components/Sidebar";

const DashboardScreen = () => {
	const { user, needVerification, success } = useSelector((state: RootState) => state.auth);
	const dispatch = useDispatch<ThunkDispatch<RootState, null, AnyAction>>();

	useEffect(() => {
		if(success) {
			dispatch(setSuccess(""));
		}
	}, [success, dispatch]);

	return (
		<div className="dashboard">
			{needVerification && <Message type="success" msg="Please verify your email"/>}
			<div className="dashboard-holder px-5">
				<div className="dashboard-columns">
					<Sidebar />
				</div>
				{/* <h1 className="is-size-1">Welcome {user?.firstName}</h1> */}
			</div>
		</div>
	)
};

export default DashboardScreen;