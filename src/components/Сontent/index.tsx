import React, { Fragment } from "react";
import { useSelector } from "react-redux";

import SelectList from "../SelectList";
import { RootState } from "../../store";
import AddNewItem from "../AddNewItem";
import Items from "../Items";

const Content = () => {
	const selectedList = useSelector((state: RootState) => state.list.selectedList);

	return (
		<div className="column is-9">
			<div className="box">
				<SelectList />
				{
					selectedList &&
						<Fragment>
							<AddNewItem list={selectedList}/>
							<hr />
							<Items items={selectedList.items} />
						</Fragment>
				}
			</div>
		</div>
	)
};

export default Content;
