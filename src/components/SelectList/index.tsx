import React, { FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

import { List } from "../../store/types/app";
import { setSelectedList } from "../../store/actions/listActions";
import { RootState } from "../../store";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { AnyAction } from "redux";

const SelectList = () => {
	const lists = useSelector((state: RootState) => state.list.lists);
	const dispatch = useDispatch<ThunkDispatch<RootState, null, AnyAction>>();

	const onSelectChange = (e: FormEvent<HTMLSelectElement>) => {
		dispatch(setSelectedList(e.currentTarget.value));
	};

	return (
		<section>
			<h2 className="is-size-4 has-text-centered mb-4">Choose a recipe</h2>
			<div className="field mb-5">
				<div className="control has-icons-left">
					<div className="select fullwidth">
						<select className="fullwidth" onChange={onSelectChange}>
							<option>Select Recipe</option>
							{Object.keys(lists).length > 0 &&
								Object.values(lists).map((list: List) => (
									<option key={list.id} value={list.id}>{list.name}</option>
								))
							}
						</select>
					</div>
					<div className="icon is-small is-left">
						<i className="fas fa-list"></i>
					</div>
				</div>
			</div>
		</section>
	)
};

export default SelectList;