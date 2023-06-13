import React, { useEffect } from "react";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { AnyAction } from "redux";
import { getListById, deleteList, setListIdToDelete } from "../../store/actions/listActions";

interface DeleteListModalProps {
	listId: string;
}

const DeleteListModal = ({listId}: DeleteListModalProps) => {
	const dispatch = useDispatch<ThunkDispatch<RootState, null, AnyAction>>();
	const list = useSelector((state: RootState) => state.list.listById);

	useEffect(() => {
		dispatch(getListById(listId));
	}, [dispatch, listId]);

	const onDeleteList = () => {
		dispatch(deleteList(listId));
	};

	const onHideModal = () => {
		dispatch(setListIdToDelete(""));
	};

	return (
		<div className="modal is-active">
			<div className="modal-background" onClick={onHideModal}></div>
			<div className="modal-card">
				<header className="modal-card-head has-text-centered">
					<p className="modal-card-title">Are you sure to want to delete recipe?</p>
				</header>
				<div className="modal-card-body">
					<h2 className="is-size-5 has-text-centered">All items related to this recipe will be deleted!</h2>
					<div className="content">
						{list?.items.length === 0 ?
							<p className="has-text-centered pt-4 mb-0">No items in this recipe!</p>
							:
							<ul>
								{list?.items.map(item => (
									<li key={item.id}>{item.name}</li>
								))}
							</ul> }
					</div>
				</div>
				<footer className="modal-card-foot">
					<Button 
						text="Delete"
						className="is-danger"
						onClick={onDeleteList}
					/>
					<Button 
						text="Cancel"
						onClick={onHideModal}
					/>
				</footer>
			</div>
		</div>
	)
};

export default DeleteListModal;
