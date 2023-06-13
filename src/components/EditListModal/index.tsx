import React, { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { RootState } from "../../store";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { List } from "../../store/types/app";
import Button from "../Button";
import Input from "../Input";
import { setListToEdit, updateList } from "../../store/actions/listActions";

interface EditListModalProps {
	list: List;
}

const EditListModal = ({list}: EditListModalProps) => {
	const [listName, setListName] = useState(list.name);
	const dispatch = useDispatch<ThunkDispatch<RootState, null, AnyAction>>();

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if(listName.trim() === "") {
			return alert ("Recipe name is required")
		}

		if(listName.trim() === "") {
			return alert ("Recipe name is the same as before")
		}

		dispatch(updateList(list.id, listName.trim()));
	};

	const onInputChange = (e: FormEvent<HTMLInputElement>) => {
		setListName(e.currentTarget.value);
	};

	const onHideModal = () => {
		dispatch(setListToEdit(""));
	};

	return (
		<div className="modal is-active">
			<div className="modal-background" onClick={onHideModal}></div>
			<form className="modal-card" onSubmit={onSubmit}>
				<header className="modal-card-head">
					<p className="modal-card-title">Edit Recipe</p>
					<Button 
						text="Delete"
						className="delete"
						onClick={onHideModal}
					/>
				</header>
				<div className="modal-card-body">
					<div className="field">
            <div className="control">
              <Input  
                type="text" 
                className="input"
                placeholder="Recipe Name"
                name="listName"
                value={listName}
                onChange={onInputChange}
								label="Recipe Name"
              />
            </div>
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

export default EditListModal;
