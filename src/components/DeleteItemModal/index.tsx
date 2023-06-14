import React, { useEffect } from "react";
import Button from "../Button";
import { useDispatch } from "react-redux";
import { RootState } from "../../store";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { AnyAction } from "redux";
import { unsetItemToDelete, deleteItem } from "../../store/actions/listActions";
import { Item, List } from "../../store/types/app";

interface DeleteItemModalProps {
	itemToDelete: {
		item: Item;
		list: List;
	}
}

const DeleteItemModal = ({itemToDelete:{item, list}} : DeleteItemModalProps) => {
	const dispatch = useDispatch<ThunkDispatch<RootState, null, AnyAction>>();

	const onDeleteItem = () => {
		dispatch(deleteItem(item, list));
	};

	const onHideModal = () => {
		dispatch(unsetItemToDelete());
	};

	return (
		<div className="modal is-active">
			<div className="modal-background" onClick={onHideModal}></div>
			<div className="modal-card">
				<header className="modal-card-head has-text-centered">
					<p className="modal-card-title">Are you sure to want to delete item?</p>
				</header>
				<footer className="modal-card-foot">
					<Button 
						text="Delete"
						className="is-danger"
						onClick={onDeleteItem}
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

export default DeleteItemModal;
