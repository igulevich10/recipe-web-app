import React, { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { RootState } from "../../store";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { Item, List } from "../../store/types/app";
import Button from "../UI/Button";
import Input from "../Input";
import { setListToEdit, unsetItemToEdit, updateItem, updateList } from "../../store/actions/listActions";

interface EditItemModalProps {
	itemToEdit: {
		item: Item,
		list: List
	}
}

const EditItemModal = ({itemToEdit: {item, list}}: EditItemModalProps) => {
	const [itemName, setItemName] = useState(item.name);
	const [itemState, setItemState] = useState(item.completed);
	const dispatch = useDispatch<ThunkDispatch<RootState, null, AnyAction>>();

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if(itemName.trim() === "") {
			return alert ("Item name is required");
		}

		if(itemName === item.name && itemState === item.completed) {
			return alert ("Item name and state are the same as before");
		}

		dispatch(updateItem(item.id, itemName, itemState, list));
	};

	const onNameChange = (e: FormEvent<HTMLInputElement>) => {
		setItemName(e.currentTarget.value);
	};

	const onStateChange = (e: FormEvent<HTMLInputElement>) => {
		setItemState(e.currentTarget.checked);
	};

	const onHideModal = () => {
		dispatch(unsetItemToEdit());
	};

	return (
		<div className="modal is-active">
			<div className="modal-background" onClick={onHideModal}></div>
			<form className="modal-card" onSubmit={onSubmit}>
				<header className="modal-card-head">
					<p className="modal-card-title">Edit Item</p>
					<Button 
						text="&#10006;"
						className="is-secondary"
						onClick={onHideModal}
					/>
				</header>
				<div className="modal-card-body">
					<div className="field">
            <div className="control">
              <Input  
                type="text" 
                className="input"
                placeholder="Item Name"
                name="itemName"
                value={itemName}
                onChange={onNameChange}
								label="Item Name"
              />
            </div>
          </div>
					<div className="field">
						<label className="checkbox">
							<input  
                type="checkbox" 
								checked={itemState}
                onChange={onStateChange}
              />
							{' '} Item/ingredient added
						</label>
					</div>
				</div>
				<footer className="modal-card-foot">
					<Button 
						text="Save changes"
						className="is-primary"
					/>
					<Button 
						text="Cancel"
						onClick={onHideModal}
					/>
				</footer>
			</form>
		</div>
	)
};

export default EditItemModal;
