import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Message from "../../components/Message";
import { setSuccess } from "../../store/actions/authActions";
import { RootState } from "../../store";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import Sidebar from "../../components/Sidebar";
import DeleteListModal from "../../components/DeleteListModal";
import EditListModal from "../../components/EditListModal";
import Content from "../../components/Сontent";

const DashboardScreen = () => {
	const { user, needVerification, success } = useSelector((state: RootState) => state.auth);
	const listIdToDelete = useSelector((state: RootState) => state.list.listIdToDelete);
	const listToEdit = useSelector((state: RootState) => state.list.listToEdit);
	const dispatch = useDispatch<ThunkDispatch<RootState, null, AnyAction>>();

	useEffect(() => {
		if(success) {
			dispatch(setSuccess(""));
		}
	}, [success, dispatch]);

	return (
		<div className="dashboard">
			{needVerification && <Message type="success" msg="Please verify your email"/>}
			<div className="container mt-5">
				<div className="columns">
					<Sidebar />
					<Content />
				</div>
				{/* <h1 className="is-size-1">Welcome {user?.firstName}</h1> */}
			</div>
			{listIdToDelete && <DeleteListModal listId={listIdToDelete} />}
			{listToEdit && <EditListModal list={listToEdit}/>}
		</div>
	)
};

export default DashboardScreen;