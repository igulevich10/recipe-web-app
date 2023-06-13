import React, { useState, FormEvent } from "react";
import { addList } from "../../store/actions/listActions";
import { List } from "../../store/types/app";
import { useDispatch } from "react-redux";
import { RootState } from "../../store";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import Button from "../Button";
import Input from "../Input";

const CreateNewList = () => {
	const [listName, setListName] = useState("");
	const dispatch = useDispatch<ThunkDispatch<RootState, null, AnyAction>>();

	const onInputChange = (e: FormEvent<HTMLInputElement>) => {
    setListName(e.currentTarget.value);
  };

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if(listName.trim() === "") {
			return alert("Recipe name is required!");
		}

		const newList: List = {
			id: `list-${new Date().getTime()}`,
			name: listName,
			items: []
		}

		dispatch(addList(newList));
		setListName("");
	};


	return (
		<div className="card mb-5">
			<div className="card-header">
				<p className="card-header-title">Create New Recipe</p>
			</div>
			<div className="card-content">
        <form onSubmit={onSubmit}>
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
          <div className="control">
						<Button 
							text="Create"
							className="is-primary"
						/>
          </div>
        </form>
      </div>
		</div>
	)
};

export default CreateNewList;
