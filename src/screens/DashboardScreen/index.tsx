import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Message from "../../components/Message";
import { setSuccess } from "../../store/actions/authActions";
import { RootState } from "../../store";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";

const DashboardScreen = () => {
	const { user, needVerification, success } = useSelector((state: RootState) => state.auth);
	const dispatch = useDispatch<ThunkDispatch<RootState, null, AnyAction>>();

	useEffect(() => {
		if(success) {
			dispatch(setSuccess(""));
		}
	}, [success, dispatch]);

	return (
		<section className="section">
			<div className="container">
				{needVerification && <Message type="success" msg="Please verify your email"/>}
				<h1 className="is-size-1">Welcome {user?.firstName}</h1>
			</div>
		</section>
	)
};

export default DashboardScreen;