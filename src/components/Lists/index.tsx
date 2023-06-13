import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { AnyAction } from "redux";
import { getLists, setListIdToDelete, setListToEdit } from "../../store/actions/listActions";
import { List } from "../../store/types/app";

const Lists = () => {
	const lists = useSelector((state: RootState) => state.list.lists);
	const dispatch = useDispatch<ThunkDispatch<RootState, null, AnyAction>>();

	useEffect(() => {
		dispatch(getLists());
	}, [dispatch]);

	const onSetListToEdit = (id: string) => {
		dispatch(setListToEdit(id));
	};

	const onSetListIdToDelete = (id: string) => {
		dispatch(setListIdToDelete(id));
	}

	return (
		<div className="panel is-primary">
			<p className="panel-heading">Your Recipes</p>
			<div>
				{Object.keys(lists).length === 0
					? 
						<p className="py-4 has-text-centered">No Recipes</p>
					: 
						<div>
							{Object.values(lists).map((list: List) => {
								return <div className="panel-block py-3" key={list.id}>
									<p onClick={() => onSetListToEdit(list.id)}>{list.name}</p>
									<span className="panel-icon has-text-danger" onClick={() => onSetListIdToDelete(list.id)}>
										<i className="fas fa-times-circle"></i>
									</span>
								</div>
							})}
						</div>
				}
			</div>
		</div>
	)
};

export default Lists;
