import React, { useState, FormEvent } from "react";
import { List, Item } from "../../store/types/app";
import { addItem } from "../../store/actions/listActions";
import { useDispatch } from "react-redux";
import { RootState } from "../../store";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import Input from "../Input";
import Button from "../UI/Button";

interface AddNewItemProps {
	list: List;
}

const AddNewItem = ({list}: AddNewItemProps) => {
	const [itemName, setItemName] = useState("");
	const dispatch = useDispatch<ThunkDispatch<RootState, null, AnyAction>>();

	const onInputChange = (e: FormEvent<HTMLInputElement>) => {
		setItemName(e.currentTarget.value);
	};

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if(itemName.trim() === "") {
			return alert("Item name is required!");
		}

		const newItem: Item = {
			name: itemName,
			id: `item-${new Date().getTime()}`,
			completed: false
		}

		dispatch(addItem(newItem, list));
		setItemName("");

	};

	return (
		<section className="section">
			<h2 className="is-size-4 has-text-centered">Add new item to selected recipe</h2>
			<form onSubmit={onSubmit}>
				<div className="field">
					<div className="control">
						<Input  
              type="text" 
              className="input"
              placeholder="Add Item"
              name="itemName"
              value={itemName}
              onChange={onInputChange}
							label="Item Name"
            />
					</div>
					<div className="control mt-4">
						<Button 
							text="Add"
							className="is-primary"
						/>
					</div>
				</div>
			</form>
		</section>
	)
};

export default AddNewItem;
