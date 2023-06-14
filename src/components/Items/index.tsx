import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { AnyAction } from "redux";
import { Item } from "../../store/types/app";
import { setItemToEdit, setItemToDelete } from "../../store/actions/listActions";
import Button from "../UI/Button";

interface ItemsProps {
	items: Item[];
}

const Items = ({items}: ItemsProps) => {
	const list = useSelector((state: RootState) => state.list.selectedList!);
	const dispatch = useDispatch<ThunkDispatch<RootState, null, AnyAction>>();

	const onSetItemToEdit = (item: Item ) => {
		dispatch(setItemToEdit(item, list));
	};

	const onSetItemToDelete = (item: Item) => {
		dispatch(setItemToDelete(item, list));
	};

	const itemsTable = (
		<table className="table is-striped is-fullwidth">
			<thead>
				<tr>
					<th>Item</th>
					<th className="has-text-centered">Edit</th>
					<th className="has-text-centered">Delete</th>
				</tr>
			</thead>
			<tbody>
				{
					items.map((item: Item) => (
						<tr key={item.id} className={item.completed ? "completed" : ""}>
							<td>{item.name}</td>
							<td className="has-text-centered">
								<Button 
									text="&#9998;"
									className="is-primary is-small"
									onClick={() => onSetItemToEdit(item)}
								>
									<span className="icon">
										<i className="fas fa-edit"></i>
									</span>
							</Button>
							</td>
							<td className="has-text-centered">
								<Button 
									text="&#10006;"
									className="is-danger is-small"
									onClick={() => onSetItemToDelete(item)}
								>
									<span className="icon">
										<i className="fas fa-times"></i>
									</span>
							</Button>
							</td>
						</tr>
					))
				}
			</tbody>
		</table>
	);

	return (
		<section className="section">
			<h2 className="is-size-4 has-text-centered">List of items in selected recipe</h2>
			{items.length === 0 ? 
				<p className="py-4 has-text-centered">No Items</p> :
				itemsTable
			}
		</section>
	)
};

export default Items;
